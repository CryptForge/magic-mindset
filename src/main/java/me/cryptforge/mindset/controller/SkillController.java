package me.cryptforge.mindset.controller;

import me.cryptforge.mindset.dto.skill.SkillEditRequest;
import me.cryptforge.mindset.dto.skill.SkillRequest;
import me.cryptforge.mindset.dto.skill.SkillResponse;
import me.cryptforge.mindset.service.SkillService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
@RequestMapping("/api/skill")
public class SkillController {

    @Autowired
    SkillService skillService;

    @GetMapping("/{id}")
    public ResponseEntity<SkillResponse> getSingleSkill(@PathVariable Long id) {
        return ResponseEntity.of(skillService.getSingleSkill(id));
    }

    @GetMapping("/all")
    public Iterable<SkillResponse> getAllSkills() {
        return skillService.getAllSkills();
    }

    @GetMapping("/all/user/{id}")
    public Iterable<SkillResponse> getAllSkillsUser(@PathVariable Long id) {
        return skillService.getAllUserSkills(id);
    }

    @PostMapping("/create")
    public SkillResponse createNewSkill(@RequestBody SkillRequest skillRequest) {
        return skillService.createNewSkill(skillRequest);
    }

    @PutMapping("/edit")
    public SkillResponse editSkill(@RequestBody SkillEditRequest skillEditRequest) {
        return skillService.editSkill(skillEditRequest);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteSkill(@PathVariable Long id) {
        skillService.deleteSkillAndCoursesAssociatedWithSkill(id);
        return ResponseEntity.ok().body("Skill deleted");
    }

}
