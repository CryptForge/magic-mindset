package me.cryptforge.mindset.service;

import me.cryptforge.mindset.dto.skill.SkillEditRequest;
import me.cryptforge.mindset.dto.skill.SkillRequest;
import me.cryptforge.mindset.dto.skill.SkillResponseWithoutTrainee;
import me.cryptforge.mindset.model.Skill;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface SkillService {
    /**
     * A method that gets a single skill from id
     *
     * @param id - The id that is used to search the single skill
     * @return - Returns the single skill or a not found response.
     */
    ResponseEntity<?> getSingleSkill(String id);

    /**
     * A method that searches all skills in the database
     *
     * @return - Returns all skills or none when there aren't any.
     */
    ResponseEntity<List<Skill>> getAllSkills();

    /**
     * A method that searches all skills of a user in the database.
     *
     * @param id - The id of the user which the values need to be found from.
     * @return - Returns a list with all skills from a user or empty.
     */
    ResponseEntity<List<SkillResponseWithoutTrainee>> getAllSkillsUser(String id);

    /**
     * A method that creates a new skill from a specialized request
     *
     * @param skillRequest -  A skill request that doesn't hold other models but ids.
     * @return - Returns a skill or a BadRequest when values aren't present.
     */
    ResponseEntity<?> createNewSkill(SkillRequest skillRequest);

    /**
     * A method that edits a skill except the trainee. Which will always be the same.
     *
     * @param skillEditRequest - The edit request gotten from the frontend.
     * @return - Returns a skill or a BadRequest when values aren't present.
     */
    ResponseEntity<?> editSkill(SkillEditRequest skillEditRequest);

    /**
     * A method that deletes a skill from the database and all courses associated to it
     *
     * @param id - The id from the skill that is to be deleted
     * @return - Returns a ok response after deletion.
     */
    ResponseEntity<?> deleteSkillAndCoursesAssociatedWithSkill(Long id);
}
