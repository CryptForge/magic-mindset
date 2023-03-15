package me.cryptforge.mindset.controller;

import me.cryptforge.mindset.dto.skill.SkillEditRequest;
import me.cryptforge.mindset.dto.skill.SkillRequest;
import me.cryptforge.mindset.dto.skill.SkillResponseWithoutTrainee;
import me.cryptforge.mindset.model.Skill;
import me.cryptforge.mindset.service.SkillService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/api/skill")
public class SkillController {

    @Autowired
    SkillService skillService;

    @GetMapping("/get/single/{id}")
    public ResponseEntity<?> getSingleSkill(@PathVariable String id) {
        return skillService.getSingleSkill(id);
    }

    @GetMapping("/get/all")
    public ResponseEntity<List<Skill>> getAllSkills() {
        return skillService.getAllSkills();
    }

    @GetMapping("/get/all/user/{id}")
    public ResponseEntity<List<SkillResponseWithoutTrainee>> getAllSkillsUser(@PathVariable String id) {
        return skillService.getAllSkillsUser(id);
    }

    @PostMapping("/create")
    public ResponseEntity<?> createNewSkill(@RequestBody SkillRequest skillRequest) {
        return skillService.createNewSkill(skillRequest);
    }

    @PostMapping("/edit")
    public ResponseEntity<?> editSkill(@RequestBody SkillEditRequest skillEditRequest) {
        return skillService.editSkill(skillEditRequest);
    }

    @GetMapping("/delete")
    public ResponseEntity<?> deleteSkill(@RequestBody Long id) {
        return skillService.deleteSkillAndCoursesAssociatedWithSkill(id);
    }

}
