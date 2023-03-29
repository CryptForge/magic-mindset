import { API_BASE } from "../../main";
import { authPostForm } from "../../util";
import { useState, useEffect } from "react";
import SelectSearch from "react-select-search";
const EditEvaluation = (props) => {
  const [selectedSkill, selectSkill] = useState(-1);
  const [selectedEvaluation, selectEvaluation] = useState(-1);

  const skillArray = props.skills.map((skill) => ({
    name: skill.name,
    value: skill.id,
  }));
  const evaluationArray = [
    {
      date: new Date("1994-10-21"),
      id: 1,
    },
    {
      date: new Date("2003-04-03"),
      id: 2,
    },
  ];
  const evaluationArrayList = evaluationArray.map((evaluation) => ({
    name: evaluation.date.toLocaleString(),
    value: evaluation.id,
  }));
  return (
    <div className="popup-container">
      <form
        className="flex flex-column"
        onSubmit={(event) => {
          authPostForm(event, `${API_BASE}/evaluation/edit`);
        }}
      >
        <label htmlFor="skill">Skill</label>
        <SelectSearch
          options={skillArray}
          name="skill"
          placeholder="Choose Skill"
          search
          onChange={(value) => selectSkill(value)}
          value={selectedSkill}
        ></SelectSearch>

        <label htmlFor="evaluation">Evaluation</label>
        <SelectSearch
          options={evaluationArrayList}
          name="evaluation"
          placeholder="Choose Evaluation"
          search
          onChange={(value) => selectEvaluation(value)}
          value={selectedEvaluation}
        />
        <label htmlFor="progress">Progress</label>
        <input
          name="progress"
          id="progress"
          type="number"
          min="0"
          max="100"
        ></input>
        <input type="submit"></input>
      </form>
    </div>
  );
};
export default EditEvaluation;
