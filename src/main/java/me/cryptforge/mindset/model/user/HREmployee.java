package me.cryptforge.mindset.model.user;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "hr_employee")
public class HREmployee {

    @Id
    @OneToOne
    @JoinColumn(name = "id")
    private UserInfo user;

}
