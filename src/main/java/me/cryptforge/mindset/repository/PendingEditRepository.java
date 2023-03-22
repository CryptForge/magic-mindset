package me.cryptforge.mindset.repository;

import me.cryptforge.mindset.model.PendingEdit;
import org.springframework.data.repository.CrudRepository;

import java.util.Optional;

public interface PendingEditRepository extends CrudRepository<PendingEdit, Long> {
    Optional<PendingEdit> findByEmail(String email);
}
