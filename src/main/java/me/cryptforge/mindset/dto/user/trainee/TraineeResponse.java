package me.cryptforge.mindset.dto.user.trainee;

import me.cryptforge.mindset.dto.course.CourseResponse;
import me.cryptforge.mindset.dto.skill.SkillResponse;
import me.cryptforge.mindset.model.user.Coach;
import me.cryptforge.mindset.model.user.Manager;
import me.cryptforge.mindset.model.user.Trainee;

import java.util.List;

public record TraineeResponse(
        Long id,
        Info info,
        TraineeCoach coach,
        TraineeManager manager,
        List<SkillResponse> skills,
        List<CourseResponse> courses
) {

    public static TraineeResponse fromTrainee(Trainee trainee) {
        return new TraineeResponse(
                trainee.getId(),
                new Info(
                        trainee.getUser().getName(),
                        trainee.getUser().getUser().getEmail(),
                        trainee.getUser().getAddress(),
                        trainee.getUser().getCity()
                ),
                TraineeCoach.fromCoach(trainee.getCoach()),
                TraineeManager.fromManager(trainee.getManager()),
                trainee.getSkills().stream().map(SkillResponse::fromSkill).toList(),
                trainee.getCourses().stream().map(CourseResponse::fromCourse).toList()
        );
    }

    public record Info(
            String name,
            String email,
            String address,
            String city
    ) {
    }

    public record TraineeCoach(
            Long id,
            String name
    ) {

        public static TraineeCoach fromCoach(Coach coach) {
            if (coach == null) {
                return null;
            }
            return new TraineeCoach(coach.getId(), coach.getUser().getName());
        }

    }

    public record TraineeManager(
            Long id,
            String name
    ) {

        public static TraineeManager fromManager(Manager manager) {
            if (manager == null) {
                return null;
            }
            return new TraineeManager(manager.getId(), manager.getUser().getName());
        }

    }

}
