import { createSlice } from "@reduxjs/toolkit";
import { smallSinglePart as defaultScore } from "../components/compose/sample-score";
import {
  modifyNote as modifyNoteService,
  toggleOrnament,
  setRepeat,
} from "./score-service";
import { getEmptyMeasure } from "../helpers/score";
import _ from "lodash";
import { createSelector } from "reselect";
import { start as startToneJs, stop as stopToneJs } from '../lib/tone';

const ACCENT = "a";
const FLAM = "f";
const DIDDLE = "d";
const CHEESE = "c";
const LEFT_STICKING = "l";
const RIGHT_STICKING = "r";

const initialState = {
  selectedNote: {
    measureIndex: -1,
    partIndex: -1,
    voiceIndex: -1,
    noteIndex: -1,
  },
  repeat: {
    start: -1,
    end: -1,
  },
  score: defaultScore,
  isPlaying: false,
};

const scoreSlice = createSlice({
  name: "score",
  initialState,
  reducers: {
    toggleIsPlaying(state) {
      state.isPlaying = !state.isPlaying;
    },
    startStop(state) {
      if (!state.isPlaying) {
        startToneJs();
      } else {
        stopToneJs();
      }
  
      state.isPlaying = !state.isPlaying;
    },
    setRepeatStart(state) {
      setRepeat(state, "start");
    },
    setRepeatEnd(state) {
      setRepeat(state, "end");
    },
    selectNote(state, action) {
      const { measureIndex, partIndex, voiceIndex, noteIndex } = action.payload;

      //If the user is selecting the same note in the score, unselect the note
      if (_.isEqual(action.payload, state.selectedNote)) {
        ["measureIndex", "partIndex", "voiceIndex", "noteIndex"].map(
          (key) => (state.selectedNote[key] = -1)
        );
      } else {
        state.selectedNote.measureIndex = measureIndex;
        state.selectedNote.partIndex = partIndex;
        state.selectedNote.voiceIndex = voiceIndex;
        state.selectedNote.noteIndex = noteIndex;
      }
    },
    updateToneJs(state, action) {
      state.toneJs = action.payload;
    },
    toggleAccent(state) {
      toggleOrnament(state, ACCENT);
    },
    toggleLeftSticking(state) {
      toggleOrnament(state, LEFT_STICKING);
    },
    toggleRightSticking(state) {
      toggleOrnament(state, RIGHT_STICKING);
    },
    toggleFlam(state) {
      toggleOrnament(state, FLAM);
    },
    toggleDiddle(state) {
      toggleOrnament(state, DIDDLE);
    },
    toggleCheese(state) {
      toggleOrnament(state, CHEESE);
    },
    addMeasure(state, action) {
      const isRight = action.payload;
      const index = state.selectedNote.measureIndex;
      //make sure a measure is selected
      if (index >= 0) {
        const { timeSig, parts } = state.score.measures[index];

        //Get the empty measure given the time signature and instruments
        const emptyMeasure = getEmptyMeasure(
          timeSig,
          parts.map((part) => part.instrument)
        );

        //Either insert the empty measure to the left or right of the currently selected measure.
        state.score.measures.splice(
          isRight ? index + 1 : index,
          0,
          emptyMeasure
        );
      }
    },
    deleteMeasure(state) {
      const measureIndex = state.selectedNote.measureIndex;

      //make sure a measure is selected
      if (measureIndex >= 0) {
        //The initial splice arguments: deleting one entry at the specified measure index.
        let spliceArguments = [measureIndex, 1];

        //If they are removing the only measure in the score
        if (state.score.measures.length === 1) {
          const { timeSig, parts } = state.score.measures[measureIndex];

          //We need to add an empty measure if they are deleting the only measure in the score.
          spliceArguments.push(
            getEmptyMeasure(
              timeSig,
              parts.map((part) => part.instrument)
            )
          );
        }

        state.score.measures.splice.apply(
          state.score.measures,
          spliceArguments
        );
      }
    },
    //When user modifies a note in the score. Ex: 8th note to 16th note
    modifyNote(state, action) {
      const { voices, value, isRest } = action.payload;
      modifyNoteService(state, voices, value, isRest);
    },
  },
});

export default scoreSlice.reducer;
export const scoreActions = scoreSlice.actions;

export const getSelectedScoreNote = createSelector(
  [state => state.selectedNote, state => state.score],
  (selectedNote, score) => {
    const { measureIndex, partIndex, voiceIndex, noteIndex } = selectedNote;
    if( measureIndex >= 0 && partIndex >= 0 && voiceIndex >= 0 && noteIndex >= 0) {
      return score.measures[measureIndex].parts[partIndex].voices[voiceIndex].notes[noteIndex];
    }
  }
)

export const getToneJs = createSelector(
  [state => state.score],
  (score) => {
    let measures = score.measures;
    const tempo = score.tempo;
    const spb = 60 / tempo;
    let toneJsNotes = [];

    const toneJs = {
      notes: [],
      duration: 0,
      numMeasures: measures.length,
    };

    let measureStartingTime = 0;
    let measureTimeLength = 0;
    let loopTimeDuration = 0;
    measures.forEach((measure) => {
      loopTimeDuration += measure.timeSig.num * spb;

      measureStartingTime += measureTimeLength;
      measureTimeLength = 0;
      const parts = measure.parts;
      let firstPart = true;
      parts.forEach((part) => {
        const { voices, instrument } = part;
        let time = measureStartingTime;

        voices.forEach((voice) => {
          const notes = voice.notes;
          notes.forEach((note) => {
            const noteSecondsDuration = (spb * 4) / note.duration;

            if (note.notes.length) {
              for (const tjsNote of note.notes) {
                toneJsNotes.push({
                  time,
                  note: tjsNote,
                  velocity: 1,
                  instrument,
                });
              }
            } else {
              toneJsNotes.push({});
            }

            time += noteSecondsDuration;
            if (firstPart) {
              measureTimeLength += noteSecondsDuration;
            }
          });
        });
        firstPart = false;
      });
    });

    toneJs.notes = toneJsNotes;
    toneJs.duration = loopTimeDuration;

    return toneJs;
  }
);