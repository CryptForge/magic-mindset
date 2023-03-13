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
    private Long id;

    @OneToOne
    @JoinColumn(name = "id")
    @PrimaryKeyJoinColumn
    private UserInfo user;

    public HREmployee(UserInfo user) {
        this.user = user;
    }
}
