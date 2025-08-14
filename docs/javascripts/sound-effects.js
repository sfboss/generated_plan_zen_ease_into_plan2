/**
 * SOUND EFFECTS & AMBIENT AUDIO SYSTEM
 */

class ZenSoundSystem {
    constructor() {
        this.audioContext = null;
        this.masterGainNode = null;
        this.ambientSounds = new Map();
        this.soundEffects = new Map();
        this.isInitialized = false;
        this.settings = {
            masterVolume: 0.7,
            ambientVolume: 0.5,
            effectsVolume: 0.8,
            enableSounds: true
        };

        this.loadSettings();
        this.init();
    }

    async init() {
        try {
            // Initialize Web Audio API
            this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
            this.masterGainNode = this.audioContext.createGain();
            this.masterGainNode.connect(this.audioContext.destination);
            this.masterGainNode.gain.value = this.settings.masterVolume;

            // Generate sound effects
            this.generateSoundEffects();

            // Generate ambient soundscapes
            this.generateAmbientSounds();

            this.isInitialized = true;
            console.log('🔊 Zen Sound System initialized');
        } catch (error) {
            console.log('Audio not supported:', error);
        }
    }

    generateSoundEffects() {
        // Tibetan Singing Bowl
        this.soundEffects.set('bell', {
            play: (frequency = 440, duration = 3) => this.createBellSound(frequency, duration)
        });

        // Meditation Chime
        this.soundEffects.set('chime', {
            play: () => this.createChimeSound()
        });

        // Success/Achievement Sound
        this.soundEffects.set('achievement', {
            play: () => this.createAchievementSound()
        });

        // Gentle Rain Drop
        this.soundEffects.set('raindrop', {
            play: () => this.createRainDropSound()
        });

        // Breath Cue
        this.soundEffects.set('breath-cue', {
            play: (type = 'in') => this.createBreathCue(type)
        });
    }

    generateAmbientSounds() {
        // Rain Soundscape
        this.ambientSounds.set('rain', {
            node: null,
            play: () => this.playRainAmbient(),
            stop: () => this.stopAmbient('rain')
        });

        // Forest Soundscape
        this.ambientSounds.set('forest', {
            node: null,
            play: () => this.playForestAmbient(),
            stop: () => this.stopAmbient('forest')
        });

        // Ocean Waves
        this.ambientSounds.set('ocean', {
            node: null,
            play: () => this.playOceanAmbient(),
            stop: () => this.stopAmbient('ocean')
        });

        // Tibetan Bowls
        this.ambientSounds.set('bowls', {
            node: null,
            play: () => this.playBowlAmbient(),
            stop: () => this.stopAmbient('bowls')
        });
    }

    createBellSound(frequency = 440, duration = 3) {
        if (!this.audioContext || !this.settings.enableSounds) return;

        const oscillator = this.audioContext.createOscillator();
        const gainNode = this.audioContext.createGain();
        const filter = this.audioContext.createBiquadFilter();

        // Bell-like timbre with multiple harmonics
        const fundamental = this.audioContext.createOscillator();
        const harmonic2 = this.audioContext.createOscillator();
        const harmonic3 = this.audioContext.createOscillator();

        const fundamentalGain = this.audioContext.createGain();
        const harmonic2Gain = this.audioContext.createGain();
        const harmonic3Gain = this.audioContext.createGain();

        // Set frequencies (bell harmonics)
        fundamental.frequency.value = frequency;
        harmonic2.frequency.value = frequency * 2.76;
        harmonic3.frequency.value = frequency * 5.4;

        // Set gains for realistic bell sound
        fundamentalGain.gain.value = 0.8;
        harmonic2Gain.gain.value = 0.3;
        harmonic3Gain.gain.value = 0.1;

        // Connect nodes
        fundamental.connect(fundamentalGain);
        harmonic2.connect(harmonic2Gain);
        harmonic3.connect(harmonic3Gain);

        fundamentalGain.connect(filter);
        harmonic2Gain.connect(filter);
        harmonic3Gain.connect(filter);

        filter.connect(gainNode);
        gainNode.connect(this.masterGainNode);

        // Filter settings for metallic sound
        filter.type = 'lowpass';
        filter.frequency.value = 2000;
        filter.Q.value = 1;

        // Envelope
        const now = this.audioContext.currentTime;
        gainNode.gain.setValueAtTime(0, now);
        gainNode.gain.rapidRampToValueAtTime(0.5 * this.settings.effectsVolume, now + 0.01);
        gainNode.gain.exponentialRampToValueAtTime(0.001, now + duration);

        // Frequency decay for realistic bell
        fundamental.frequency.exponentialRampToValueAtTime(frequency * 0.8, now + duration);
        harmonic2.frequency.exponentialRampToValueAtTime(frequency * 2.76 * 0.8, now + duration);
        harmonic3.frequency.exponentialRampToValueAtTime(frequency * 5.4 * 0.8, now + duration);

        // Start and stop
        fundamental.start(now);
        harmonic2.start(now);
        harmonic3.start(now);

        fundamental.stop(now + duration);
        harmonic2.stop(now + duration);
        harmonic3.stop(now + duration);

        // Visual feedback
        this.showSoundWave('bell');
    }

    createChimeSound() {
        if (!this.audioContext || !this.settings.enableSounds) return;

        const frequencies = [523.25, 659.25, 783.99]; // C5, E5, G5 chord

        frequencies.forEach((freq, index) => {
            setTimeout(() => {
                this.createBellSound(freq, 2);
            }, index * 200);
        });
    }

    createAchievementSound() {
        if (!this.audioContext || !this.settings.enableSounds) return;

        // Uplifting major arpeggio
        const notes = [261.63, 329.63, 392.00, 523.25]; // C4, E4, G4, C5

        notes.forEach((freq, index) => {
            setTimeout(() => {
                this.createBellSound(freq, 1);
            }, index * 150);
        });

        this.showSoundWave('achievement');
    }

    createRainDropSound() {
        if (!this.audioContext || !this.settings.enableSounds) return;

        const oscillator = this.audioContext.createOscillator();
        const gainNode = this.audioContext.createGain();
        const filter = this.audioContext.createBiquadFilter();

        oscillator.connect(filter);
        filter.connect(gainNode);
        gainNode.connect(this.masterGainNode);

        // High frequency noise-like sound
        oscillator.type = 'sawtooth';
        oscillator.frequency.setValueAtTime(800, this.audioContext.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(200, this.audioContext.currentTime + 0.1);

        filter.type = 'lowpass';
        filter.frequency.value = 1000;

        const now = this.audioContext.currentTime;
        gainNode.gain.setValueAtTime(0, now);
        gainNode.gain.rapidRampToValueAtTime(0.1 * this.settings.effectsVolume, now + 0.01);
        gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.1);

        oscillator.start(now);
        oscillator.stop(now + 0.1);
    }

    createBreathCue(type) {
        if (!this.audioContext || !this.settings.enableSounds) return;

        const frequency = type === 'in' ? 220 : 165; // Lower for exhale
        const duration = 0.5;

        const oscillator = this.audioContext.createOscillator();
        const gainNode = this.audioContext.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(this.masterGainNode);

        oscillator.type = 'sine';
        oscillator.frequency.value = frequency;

        const now = this.audioContext.currentTime;
        gainNode.gain.setValueAtTime(0, now);
        gainNode.gain.rapidRampToValueAtTime(0.1 * this.settings.effectsVolume, now + 0.1);
        gainNode.gain.exponentialRampToValueAtTime(0.001, now + duration);

        oscillator.start(now);
        oscillator.stop(now + duration);
    }

    playRainAmbient() {
        if (!this.audioContext || !this.settings.enableSounds) return;

        this.stopAllAmbient();

        // Create pink noise for rain
        const bufferSize = 4096;
        const pinkNoise = this.audioContext.createScriptProcessor(bufferSize, 0, 1);
        const gainNode = this.audioContext.createGain();
        const filter = this.audioContext.createBiquadFilter();

        let b0, b1, b2, b3, b4, b5, b6;
        b0 = b1 = b2 = b3 = b4 = b5 = b6 = 0.0;

        pinkNoise.onaudioprocess = (e) => {
            const output = e.outputBuffer.getChannelData(0);
            for (let i = 0; i < bufferSize; i++) {
                const white = Math.random() * 2 - 1;
                b0 = 0.99886 * b0 + white * 0.0555179;
                b1 = 0.99332 * b1 + white * 0.0750759;
                b2 = 0.96900 * b2 + white * 0.1538520;
                b3 = 0.86650 * b3 + white * 0.3104856;
                b4 = 0.55000 * b4 + white * 0.5329522;
                b5 = -0.7616 * b5 - white * 0.0168980;
                output[i] = b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362;
                output[i] *= 0.11;
                b6 = white * 0.115926;
            }
        };

        pinkNoise.connect(filter);
        filter.connect(gainNode);
        gainNode.connect(this.masterGainNode);

        filter.type = 'lowpass';
        filter.frequency.value = 1000;
        gainNode.gain.value = this.settings.ambientVolume;

        this.ambientSounds.get('rain').node = pinkNoise;
    }

    playForestAmbient() {
        if (!this.audioContext || !this.settings.enableSounds) return;

        this.stopAllAmbient();

        // Create forest ambience with multiple layers
        const layers = [];

        // Wind through trees (low frequency)
        const windOsc = this.audioContext.createOscillator();
        const windGain = this.audioContext.createGain();
        const windFilter = this.audioContext.createBiquadFilter();

        windOsc.type = 'sawtooth';
        windOsc.frequency.value = 80;
        windFilter.type = 'lowpass';
        windFilter.frequency.value = 300;
        windGain.gain.value = 0.1 * this.settings.ambientVolume;

        windOsc.connect(windFilter);
        windFilter.connect(windGain);
        windGain.connect(this.masterGainNode);
        windOsc.start();

        layers.push(windOsc);

        // Bird chirps (random)
        const createBirdChirp = () => {
            if (!this.ambientSounds.get('forest').node) return;

            setTimeout(() => {
                const freq = 800 + Math.random() * 1000;
                this.createBellSound(freq, 0.3);
                createBirdChirp();
            }, 2000 + Math.random() * 8000);
        };

        createBirdChirp();

        this.ambientSounds.get('forest').node = {
            layers, stop: () => {
                layers.forEach(layer => layer.stop());
            }
        };
    }

    playOceanAmbient() {
        if (!this.audioContext || !this.settings.enableSounds) return;

        this.stopAllAmbient();

        // Ocean waves using filtered noise with LFO
        const bufferSize = 4096;
        const whiteNoise = this.audioContext.createScriptProcessor(bufferSize, 0, 1);
        const filter = this.audioContext.createBiquadFilter();
        const gainNode = this.audioContext.createGain();
        const lfo = this.audioContext.createOscillator();
        const lfoGain = this.audioContext.createGain();

        whiteNoise.onaudioprocess = (e) => {
            const output = e.outputBuffer.getChannelData(0);
            for (let i = 0; i < bufferSize; i++) {
                output[i] = (Math.random() * 2 - 1) * 0.1;
            }
        };

        // LFO for wave motion
        lfo.type = 'sine';
        lfo.frequency.value = 0.3; // Slow waves
        lfoGain.gain.value = 200;

        lfo.connect(lfoGain);
        lfoGain.connect(filter.frequency);

        whiteNoise.connect(filter);
        filter.connect(gainNode);
        gainNode.connect(this.masterGainNode);

        filter.type = 'lowpass';
        filter.frequency.value = 500;
        gainNode.gain.value = this.settings.ambientVolume;

        lfo.start();

        this.ambientSounds.get('ocean').node = {
            whiteNoise, lfo, stop: () => {
                lfo.stop();
            }
        };
    }

    playBowlAmbient() {
        if (!this.audioContext || !this.settings.enableSounds) return;

        this.stopAllAmbient();

        // Periodic singing bowls
        const playBowl = () => {
            if (!this.ambientSounds.get('bowls').node) return;

            const frequencies = [220, 261.63, 329.63, 392.00]; // A3, C4, E4, G4
            const freq = frequencies[Math.floor(Math.random() * frequencies.length)];
            this.createBellSound(freq, 8);

            setTimeout(playBowl, 15000 + Math.random() * 10000);
        };

        playBowl();
        this.ambientSounds.get('bowls').node = { active: true };
    }

    stopAmbient(type) {
        const ambient = this.ambientSounds.get(type);
        if (ambient && ambient.node) {
            if (ambient.node.stop) {
                ambient.node.stop();
            } else if (ambient.node.layers) {
                ambient.node.layers.forEach(layer => layer.stop());
            }
            ambient.node = null;
        }
    }

    stopAllAmbient() {
        this.ambientSounds.forEach((ambient, type) => {
            this.stopAmbient(type);
        });
    }

    showSoundWave(type) {
        // Visual feedback for sound effects
        const waves = document.querySelectorAll('.sound-waves, .breath-sound-waves');
        waves.forEach(wave => {
            wave.classList.add('active');
            setTimeout(() => wave.classList.remove('active'), 1000);
        });

        // Create ripple effect
        const ripple = document.createElement('div');
        ripple.className = 'sound-ripple';
        ripple.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            width: 20px;
            height: 20px;
            border: 2px solid var(--zen-accent);
            border-radius: 50%;
            transform: translate(-50%, -50%);
            pointer-events: none;
            z-index: 1000;
            animation: sound-ripple 1s ease-out forwards;
        `;

        document.body.appendChild(ripple);
        setTimeout(() => document.body.removeChild(ripple), 1000);
    }

    // Public API
    playSound(effectName, ...args) {
        const effect = this.soundEffects.get(effectName);
        if (effect) {
            effect.play(...args);
        }
    }

    playAmbient(ambientName) {
        const ambient = this.ambientSounds.get(ambientName);
        if (ambient) {
            ambient.play();
        }
    }

    setMasterVolume(volume) {
        this.settings.masterVolume = Math.max(0, Math.min(1, volume));
        if (this.masterGainNode) {
            this.masterGainNode.gain.value = this.settings.masterVolume;
        }
        this.saveSettings();
    }

    setAmbientVolume(volume) {
        this.settings.ambientVolume = Math.max(0, Math.min(1, volume));
        this.saveSettings();
    }

    setEffectsVolume(volume) {
        this.settings.effectsVolume = Math.max(0, Math.min(1, volume));
        this.saveSettings();
    }

    toggleSounds() {
        this.settings.enableSounds = !this.settings.enableSounds;
        if (!this.settings.enableSounds) {
            this.stopAllAmbient();
        }
        this.saveSettings();
    }

    loadSettings() {
        const saved = localStorage.getItem('zenSoundSettings');
        if (saved) {
            this.settings = { ...this.settings, ...JSON.parse(saved) };
        }
    }

    saveSettings() {
        localStorage.setItem('zenSoundSettings', JSON.stringify(this.settings));
    }

    // Resume audio context (needed for autoplay policies)
    resume() {
        if (this.audioContext && this.audioContext.state === 'suspended') {
            this.audioContext.resume();
        }
    }
}

// Add sound effect styles
const soundStyles = `
<style>
@keyframes sound-ripple {
    0% {
        width: 20px;
        height: 20px;
        opacity: 1;
    }
    100% {
        width: 200px;
        height: 200px;
        opacity: 0;
    }
}

.sound-waves.active .sound-bar {
    animation: wave 1.5s infinite ease-in-out;
}

.sound-toggle {
    background: linear-gradient(145deg, #f0f0f0, #ffffff);
    border: 2px solid transparent;
    border-radius: 50%;
    width: 50px;
    height: 50px;
    cursor: pointer;
    transition: all 0.3s ease;
    font-size: 1.2em;
}

.sound-toggle:hover {
    transform: scale(1.1);
    box-shadow: 0 5px 15px rgba(0,0,0,0.2);
}

.sound-toggle.active {
    border-color: var(--zen-accent);
    background: linear-gradient(145deg, var(--zen-accent), var(--zen-gold));
    color: white;
}
</style>
`;

document.head.insertAdjacentHTML('beforeend', soundStyles);

// Initialize sound system
document.addEventListener('DOMContentLoaded', () => {
    window.zenSounds = new ZenSoundSystem();

    // Resume audio context on first user interaction
    document.addEventListener('click', () => {
        if (window.zenSounds) {
            window.zenSounds.resume();
        }
    }, { once: true });
});

export default ZenSoundSystem;
