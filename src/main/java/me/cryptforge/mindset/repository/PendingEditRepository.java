package me.cryptforge.mindset.repository;

import me.cryptforge.mindset.model.PendingEdit;
import org.springframework.data.repository.CrudRepository;

public interface PendingEditRepository extends CrudRepository<PendingEdit, Long> {
    boolean existsByEmail(String email);
}
