package me.cryptforge.mindset.service;

import me.cryptforge.mindset.model.File;
import org.springframework.web.multipart.MultipartFile;

public interface FileService {

    String saveFileUUIDBack(MultipartFile multipartFile);

    File getFile(String uuidString);
}
