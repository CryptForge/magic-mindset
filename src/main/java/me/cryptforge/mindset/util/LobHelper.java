package me.cryptforge.mindset.util;

import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.InputStream;
import java.sql.Blob;

@Service
public class LobHelper {

    @Autowired
    private SessionFactory sessionFactory;

    public Blob createBlob(InputStream content, long size) {
        return sessionFactory.getCurrentSession().getLobHelper().createBlob(content, size);
    }
}
