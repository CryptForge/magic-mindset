package me.cryptforge.mindset.repository;

import me.cryptforge.mindset.model.user.HREmployee;
import org.springframework.data.repository.CrudRepository;

public interface HREmployeeRepository extends CrudRepository<HREmployee, Long> {
}