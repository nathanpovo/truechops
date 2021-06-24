import { Icon } from "@material-ui/core";
import Chip from "@material-ui/core/Chip";
import { useState } from "react";
import Image from "../../ui/Image";

import ThirtysecondNoteIcon from "../../../../icons/notes/thirtysecond.svg";
import SixteenthNoteIcon from "../../../../icons/notes/sixteenth.svg";
import EighthNoteIcon from "../../../../icons/notes/eighth.svg";
import QuarterNoteIcon from "../../../../icons/notes/quarter.svg";
import HalfNoteIcon from "../../../../icons/notes/half.svg";
import WholeNoteIcon from "../../../../icons/notes/whole.svg";

import ThirtysecondNoteRestIcon from "../../../../icons/notes/thirtysecondRest.svg";
import SixteenthNoteRestIcon from "../../../../icons/notes/sixteenthRest.svg";
import EighthNoteRestIcon from "../../../../icons/notes/eighthRest.svg";
import QuarterNoteRestIcon from "../../../../icons/notes/quarterRest.svg";
import HalfNoteRestIcon from "../../../../icons/notes/halfRest.svg";
import WholeNoteRestIcon from "../../../../icons/notes/wholeRest.svg";

import RepeatEndIcon from "../../../../icons/measure/repeatEnd.svg";
import RepeatStartIcon from "../../../../icons/measure/repeatStart.svg";
import AddLeftIcon from "../../../../icons/measure/addLeft.svg";
import AddRightIcon from "../../../../icons/measure/addRight.svg";
import DeleteMeasureIcon from "../../../../icons/measure/deleteMeasure.svg";

import AccentIcon from "../../../../icons/ornaments/accent.svg";
import CheeseIcon from "../../../../icons/ornaments/cheese.svg";
import DiddleIcon from "../../../../icons/ornaments/diddle.svg";
import FlamIcon from "../../../../icons/ornaments/flam.svg";
import LeftStickingIcon from "../../../../icons/ornaments/leftSticking.svg";
import RightStickingIcon from "../../../../icons/ornaments/rightSticking.svg";

import Button from "../../ui/Button";

import SvgIcon from "@material-ui/core/SvgIcon";
import SvgButton from "../../ui/SvgButton";

import { makeStyles } from "@material-ui/core/styles";
import { useSelector, useDispatch } from "react-redux";
import { scoreActions } from "../../../store/score";

const durationLookup = {
  whole: 64,
  half: 32,
  quarter: 16,
  eighth: 8,
  sixteenth: 4,
  thirtysecond: 2,
};

const useTabStyles = makeStyles((theme) => ({
  chips: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  chip: {
    ...theme.compose.buttons.chip,
  },
  imageIcon: {
    display: "flex",
    height: "inherit",
    width: "inherit",
  },
  imageSelected: {
    filter: "invert(1)",
  },
  wholeNoteImageIcon: {
    position: "relative",
    ...theme.compose.buttons.wholeNote,
  },
  noteButton: {
    //...theme.compose.buttons.note,
  },
  noteButtonSelected: {
    backgroundColor: "black",
  },
}));

export default function useComposeButtons(modifyNoteHandler) {
  const kickSelected = useSelector((state) => state.score.kickSelected);
  const snareSelected = useSelector((state) => state.score.snareSelected);
  const hatSelected = useSelector((state) => state.score.hiHatSelected);
  const tom1Selected = useSelector((state) => state.score.tom1Selected);
  const tom2Selected = useSelector((state) => state.score.tom2Selected);
  const tom3Selected = useSelector((state) => state.score.tom3Selected);
  const tom4Selected = useSelector((state) => state.score.tom4Selected);
  const rideSelected = useSelector((state) => state.score.rideSelected);
  const hatFootSelected = useSelector((state) => state.score.hiHatFootSelected);
  const dotSelected = useSelector((state) => state.score.dotSelected);

  const repeatStart = useSelector((state) => state.score.repeat.start);
  const repeatEnd = useSelector((state) => state.score.repeat.end);

  const selectedMeasureIndex = useSelector(
    (state) => state.score.selectedNote.measureIndex
  );

  const isPlaying = useSelector(state  => state.score.isPlaying);

  const dispatch = useDispatch();

  const classes = useTabStyles();
  const noteButtonsRow1 = [
    { 
      onClick: modifyNoteHandler.bind(null, durationLookup["whole"], false),
      viewBox: '-12 -12 40 32',
      component: WholeNoteIcon 
    },
    { 
      onClick: modifyNoteHandler.bind(null, durationLookup["half"], false),
      viewBox: '0 0 15.28 42.64',
      component: HalfNoteIcon 
    },
    { 
      onClick: modifyNoteHandler.bind(null, durationLookup["quarter"], false),
      viewBox: '0 0 15.28 42.64',
      component: QuarterNoteIcon 
    },
    { 
      onClick: modifyNoteHandler.bind(null, durationLookup["eighth"], false),
      viewBox: '0 0 29 43',
      component: EighthNoteIcon 
    },
    { 
      onClick: modifyNoteHandler.bind(null, durationLookup["sixteenth"], false),
      viewBox: '0 0 28.43 50',
      component: SixteenthNoteIcon 
    },
    { 
      onClick: modifyNoteHandler.bind(null, durationLookup["thirtysecond"], false),
      viewBox: '0 0 28.43 50',
      component: ThirtysecondNoteIcon 
    },
  ].map(props =>
    <SvgButton
      key={Math.random().toString()}
      onClick={props.onClick}
      viewBox={props.viewBox}
      component={props.component}
    />
  );

  const noteButtonsRow2Mobile = [
    { 
      onClick: modifyNoteHandler.bind(null, durationLookup["whole"], true),
      viewBox: '-14 -12 80 40',
      component: WholeNoteRestIcon 
    },
    { 
      onClick: modifyNoteHandler.bind(null, durationLookup["half"], true),
      viewBox: '-14 -12 80 40',
      component: HalfNoteRestIcon 
    },
    { 
      onClick: modifyNoteHandler.bind(null, durationLookup["quarter"], true),
      viewBox: '0 0 16.05 43.81',
      component: QuarterNoteRestIcon 
    },
    { 
      onClick: modifyNoteHandler.bind(null, durationLookup["eighth"], true),
      viewBox: '0 0 20.04 34',
      component: EighthNoteRestIcon 
    },
    { 
      onClick: modifyNoteHandler.bind(null, durationLookup["sixteenth"], true),
      viewBox: '0 0 26.27 50',
      component: SixteenthNoteRestIcon 
    },
    { 
      onClick: modifyNoteHandler.bind(null, durationLookup["thirtysecond"], true),
      viewBox: '0 0 25.82 50',
      component: ThirtysecondNoteRestIcon 
    },
  ].map(props =>
    <SvgButton
      key={Math.random().toString()}
      onClick={props.onClick}
      viewBox={props.viewBox}
      component={props.component}
    />
  );

  const tupletButtons = ["3:2", "3:2"].map((tupletText) => (
    <Button
      key={Math.random().toString()}
      variant="outlined"
      className={classes.noteButton}
    >
      {tupletText}
    </Button>
  ));

  /*const noteButtonsRow2Desktop = [
    "thirtysecondRest",
    "sixteenthRest",
    "eighthRest",
    "quarterRest",
    "halfRest",
    "wholeRest",
  ].map((noteFileName) =>
    ComposeButton(
      `/icons/notes/${noteFileName}.svg`,
      ["wholeRest", "halfRest"].includes(noteFileName)
        ? classes.wholeNoteImageIcon
        : classes.imageIcon,
      modifyNoteHandler.bind(
        null,
        durationLookup[noteFileName.replace("Rest", "")]
      )
    )
  );*/

  const noteButtonsRow2Desktop = noteButtonsRow2Mobile.slice().reverse();

  const instrumentsRow1 = [
    {
      onClick: () => dispatch(scoreActions.toggleKickSelected()),
      text: "K",
      selected: kickSelected,
    },
    {
      onClick: () => dispatch(scoreActions.toggleSnareSelected()),
      text: "S",
      selected: snareSelected,
    },
    {
      onClick: () => dispatch(scoreActions.toggleHiHatSelected()),
      text: "HH",
      selected: hatSelected,
    },
    {
      onClick: () => dispatch(scoreActions.toggleRideSelected()),
      text: "R",
      selected: rideSelected,
    },
    {
      onClick: () => dispatch(scoreActions.toggleHiHatFootSelected()),
      text: "HF",
      selected: hatFootSelected,
    },
  ].map((props) => (
    <Button
      key={Math.random().toString()}
      onClick={props.onClick}
      selected={props.selected}
    >
      {props.text}
    </Button>
  ));

  const instrumentsRow2 = [
    {
      onClick: () => dispatch(scoreActions.toggleTom1Selected()),
      text: "T1",
      selected: tom1Selected,
    },
    {
      onClick: () => dispatch(scoreActions.toggleTom2Selected()),
      text: "T2",
      selected: tom2Selected,
    },
    {
      onClick: () => dispatch(scoreActions.toggleTom3Selected()),
      text: "T3",
      selected: tom3Selected,
    },
    {
      onClick: () => dispatch(scoreActions.toggleTom4Selected()),
      text: "T4",
      selected: tom4Selected,
    },
    {
      onClick: () => dispatch(scoreActions.toggleDotSelected()),
      text: ".",
      selected: dotSelected,
    },
  ]
    .map((props) => (
      <Button
        key={Math.random().toString()}
        onClick={props.onClick}
        selected={props.selected}
      >
        {props.text}
      </Button>
    ));

  const ornamentButtons = [
    {
      component: LeftStickingIcon,
      onClick: dispatch(scoreActions.toggleLeftSticking()),
      viewBox: "0 0 39.33 50",
    },
    {
      component: RightStickingIcon,
      onClick: dispatch(scoreActions.toggleRightSticking()),
      viewBox: "0 0 39.33 49.55",
    },
    {
      component: AccentIcon,
      onClick: dispatch(scoreActions.toggleAccent()),
      viewBox: "0 0 42.39 50",
    },
    {
      component: FlamIcon,
      onClick: dispatch(scoreActions.toggleFlam()),
      viewBox: "0 0 47.58 50",
    },
    {
      component: DiddleIcon,
      onClick: dispatch(scoreActions.toggleDiddle()),
      viewBox: "0 0 55.55 50",
    },
    {
      component: CheeseIcon,
      onClick: dispatch(scoreActions.toggleCheese()),
      viewBox: "0 0 66.8 50",
    },
  ].map(props =>
  <SvgButton
  key={Math.random().toString()}
  onClick={props.onClick}
  selected={props.selected}
  viewBox={props.viewBox}
  component={props.component}
/>
  );

  const measureButtons = [
    {
      component: AddLeftIcon,
      onClick: dispatch.bind(null, scoreActions.addMeasure(false)),
      viewBox: "0 0 18 14",
      disabled: isPlaying
    },
    {
      component: AddRightIcon,
      onClick: dispatch.bind(null, scoreActions.addMeasure(true)),
      viewBox: "0 0 18 14",
      disabled: isPlaying
    },
    {
      component: DeleteMeasureIcon,
      onClick: dispatch.bind(null, scoreActions.deleteMeasure()),
      viewBox: "0 0 68.2 52.01",
      disabled: isPlaying
    },
    {
      component: RepeatStartIcon,
      onClick: dispatch.bind(null, scoreActions.setRepeatStart()),
      selected: selectedMeasureIndex != -1 && selectedMeasureIndex === repeatStart,
      viewBox: "0 0 68.2 52.01",
      disabled: isPlaying
    },
    {
      component: RepeatEndIcon,
      onClick: dispatch.bind(null, scoreActions.setRepeatEnd()),
      selected: selectedMeasureIndex != -1 && selectedMeasureIndex === repeatEnd,
      viewBox: "0 0 68.2 52.01",
      disabled: isPlaying
    },
  ].map((props) => (
    <SvgButton
      key={Math.random().toString()}
      onClick={props.onClick}
      selected={props.selected}
      viewBox={props.viewBox}
      component={props.component}
      disabled={props.disabled}
    />
  ));

  return {
    measureButtons,
    ornamentButtons,
    instrumentsRow1,
    instrumentsRow2,
    noteButtonsRow1,
    noteButtonsRow2Mobile,
    noteButtonsRow2Desktop,
    tupletButtons,
  };
}
