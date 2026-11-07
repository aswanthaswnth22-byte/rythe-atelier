"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/Button";
import {
  readSoundPreference,
  shouldSkipEntranceMotion
} from "@/lib/entrance/entrance-state";

type AmbientAudio = {
  context: AudioContext;
  oscillators: OscillatorNode[];
  gain: GainNode;
};

export function EntranceExperience() {
  const [isEntering, setIsEntering] = useState(false);
  const [hasEntered, setHasEntered] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [audioActive, setAudioActive] = useState(false);
  const [audioAvailable, setAudioAvailable] = useState(true);
  const audioRef = useRef<AmbientAudio | null>(null);

  useEffect(() => {
    try {
      setIsMuted(!readSoundPreference(window.localStorage.getItem("rythe-ambient-sound")));
    } catch {
      setIsMuted(true);
    }
  }, []);

  useEffect(() => {
    return () => {
      const audio = audioRef.current;
      if (audio) {
        audio.oscillators.forEach((oscillator) => {
          try {
            oscillator.stop();
          } catch {
            // An oscillator may already have stopped.
          }
        });
        void audio.context.close();
        audioRef.current = null;
      }
    };
  }, []);

  function startAmbientAudio() {
    if (audioRef.current || typeof window === "undefined") return;

    const AudioContextConstructor =
      window.AudioContext ||
      (window as Window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;

    if (!AudioContextConstructor) {
      setAudioAvailable(false);
      return;
    }

    try {
      const context = new AudioContextConstructor();
      const master = context.createGain();
      const filter = context.createBiquadFilter();
      filter.type = "lowpass";
      filter.frequency.value = 180;
      master.gain.setValueAtTime(0.0001, context.currentTime);
      master.gain.exponentialRampToValueAtTime(0.012, context.currentTime + 2.4);
      filter.connect(master);
      master.connect(context.destination);

      const oscillators = [55, 82.41].map((frequency, index) => {
        const oscillator = context.createOscillator();
        oscillator.type = index === 0 ? "sine" : "triangle";
        oscillator.frequency.value = frequency;
        oscillator.detune.value = index === 0 ? -3 : 4;
        oscillator.connect(filter);
        oscillator.start();
        return oscillator;
      });

      audioRef.current = { context, oscillators, gain: master };
      setAudioActive(true);
    } catch {
      setAudioAvailable(false);
    }
  }

  function stopAmbientAudio() {
    const audio = audioRef.current;
    if (!audio) {
      setAudioActive(false);
      return;
    }

    const stopAt = audio.context.currentTime + 0.35;
    audio.gain.gain.cancelScheduledValues(audio.context.currentTime);
    audio.gain.gain.setTargetAtTime(0.0001, audio.context.currentTime, 0.08);
    audio.oscillators.forEach((oscillator) => {
      try {
        oscillator.stop(stopAt);
      } catch {
        // An oscillator may already have stopped.
      }
    });
    window.setTimeout(() => void audio.context.close(), 500);
    audioRef.current = null;
    setAudioActive(false);
  }

  function toggleSound() {
    if (isMuted) {
      setIsMuted(false);
      try {
        window.localStorage.setItem("rythe-ambient-sound", "on");
      } catch {
        // Sound remains usable if browser storage is unavailable.
      }
      startAmbientAudio();
      return;
    }

    if (!audioActive) {
      startAmbientAudio();
      return;
    }

    setIsMuted(true);
    try {
      window.localStorage.setItem("rythe-ambient-sound", "off");
    } catch {
      // Sound remains usable if browser storage is unavailable.
    }
    stopAmbientAudio();
  }

  function enterAtelier() {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (shouldSkipEntranceMotion(reducedMotion)) {
      setHasEntered(true);
      return;
    }

    setIsEntering(true);
    window.setTimeout(() => setHasEntered(true), 1750);
  }

  return (
    <main className={`entrance-shell${isEntering ? " is-entering" : ""}${hasEntered ? " has-entered" : ""}`}>
      <header className="entrance-header">
        <a className="entrance-wordmark" href="/" aria-label="RYTHE ATELIER">
          RYTHE <span>ATELIER</span>
        </a>
        <span className="entrance-edition">DIGITAL ATELIER / 2050</span>
      </header>

      {!hasEntered ? (
        <section className="entrance-stage" aria-labelledby="entrance-title">
          <div className="entrance-grid" aria-hidden="true" />
          <div className="entrance-halo" aria-hidden="true" />
          <div className="entrance-architecture" aria-hidden="true">
            <div className="door-frame">
              <div className="door-leaf door-leaf-left" />
              <div className="door-leaf door-leaf-right" />
              <div className="door-light" />
              <div className="door-threshold" />
            </div>
          </div>

          <div className="entrance-copy">
            <p className="entrance-kicker">A DIFFERENT WAY TO EXPERIENCE FORM</p>
            <h1 id="entrance-title">BEYOND<br /><em>THE ORDINARY.</em></h1>
            <p className="entrance-description">
              Step into the RYTHE universe — a digital space shaped by form,
              material and intention.
            </p>
            <Button className="enter-button" onClick={enterAtelier}>
              <span>ENTER THE ATELIER</span>
              <span aria-hidden="true">↗</span>
            </Button>
            <p className="entrance-note">COLLECTIONS / OBJECTS / STORIES</p>
          </div>

          <div className="entrance-side-index" aria-hidden="true">
            <span>RA — 2050</span>
            <span>01 / 03</span>
          </div>
          <div className="entrance-door-overlay door-overlay-left" aria-hidden="true" />
          <div className="entrance-door-overlay door-overlay-right" aria-hidden="true" />
        </section>
      ) : (
        <section className="threshold-arrival" aria-labelledby="arrival-title">
          <p className="entrance-kicker">THRESHOLD / 001</p>
          <h1 id="arrival-title">THE SPACE<br /><em>IS YOURS.</em></h1>
          <p className="entrance-description">
            You have entered the RYTHE digital atelier. The showroom is being
            prepared for its next chapter.
          </p>
          <div className="arrival-rule" />
          <p className="entrance-note">THE THRESHOLD IS OPEN — SHOWROOM NAVIGATION FOLLOWS IN PHASE 03.</p>
        </section>
      )}

      <footer className="entrance-footer">
        <span>© RYTHE ATELIER</span>
        <span>DESIGNED WITH INTENTION. WORN ON YOUR OWN RHYTHM.</span>
        <button
          className="sound-toggle"
          type="button"
          onClick={toggleSound}
          aria-pressed={!isMuted}
          aria-label={isMuted ? "Enable ambient sound" : "Mute ambient sound"}
        >
          <span className={`sound-indicator${audioActive ? " is-playing" : ""}`} aria-hidden="true" />
          {isMuted ? "SOUND OFF" : audioActive ? "SOUND ON" : "ACTIVATE SOUND"}
        </button>
        {!audioAvailable && <span className="sound-unavailable" role="status">AUDIO UNAVAILABLE</span>}
      </footer>
    </main>
  );
}
