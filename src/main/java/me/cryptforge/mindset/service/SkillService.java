package me.cryptforge.mindset.service;

import me.cryptforge.mindset.dto.skill.SkillEditRequest;
import me.cryptforge.mindset.dto.skill.SkillRequest;
import me.cryptforge.mindset.dto.skill.SkillResponse;

import java.util.Optional;

public interface SkillService {
    /**
     * A method that gets a single skill from id
     *
     * @param id The id that is used to search the single skill
     * @return The single skill or a not found response.
     */
    Optional<SkillResponse> getSingleSkill(Long id);

    /**
     * A method that searches all skills in the database
     *
     * @return All skills or none when there aren't any.
     */
    Iterable<SkillResponse> getAllSkills();

    /**
     * A method that searches all skills of a user in the database.
     *
     * @param id The id of the user which the values need to be found from.
     * @return A list with all skills from a user or empty.
     */
    Iterable<SkillResponse> getAllUserSkills(Long id);

    /**
     * A method that creates a new skill from a specialized request
     *
     * @param skillRequest A skill request that doesn't hold other models but ids.
     * @return The created skill
     */
    SkillResponse createNewSkill(SkillRequest skillRequest);

    /**
     * A method that edits a skill except the trainee. Which will always be the same.
     *
     * @param skillEditRequest The edit request gotten from the frontend.
     * @return The edited skill
     */
    SkillResponse editSkill(SkillEditRequest skillEditRequest);

    /**
     * A method that deletes a skill from the database and all courses associated to it
     *
     * @param id The id from the skill that is to be deleted
     */
    void deleteSkillAndCoursesAssociatedWithSkill(Long id);
}
