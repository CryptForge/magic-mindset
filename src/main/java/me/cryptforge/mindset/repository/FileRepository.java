package me.cryptforge.mindset.repository;

import me.cryptforge.mindset.model.File;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface FileRepository extends CrudRepository<File, UUID> {
}
