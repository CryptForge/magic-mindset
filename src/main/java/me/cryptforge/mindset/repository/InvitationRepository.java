package me.cryptforge.mindset.repository;

import me.cryptforge.mindset.model.Evaluation;
import me.cryptforge.mindset.model.EvaluationInvitation;
import me.cryptforge.mindset.model.user.UserInfo;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface InvitationRepository extends CrudRepository<EvaluationInvitation, Long> {

    Iterable<EvaluationInvitation> findAllByUser(UserInfo trainee);

    Iterable<EvaluationInvitation> findAllByEvaluation(Evaluation evaluation);

}
