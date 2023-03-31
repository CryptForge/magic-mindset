package me.cryptforge.mindset.service;

import me.cryptforge.mindset.exception.EntityNotFoundException;
import me.cryptforge.mindset.model.File;
import me.cryptforge.mindset.repository.FileRepository;
import me.cryptforge.mindset.util.LobHelper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.InputStream;
import java.sql.Blob;
import java.util.UUID;

@Service
public class FileServiceImpl implements FileService {

    @Autowired
    private LobHelper lobCreator;
    @Autowired
    private FileRepository fileRepository;

    @Override
    public String saveFileUUIDBack(MultipartFile request) {
        try (final InputStream inputStream = request.getInputStream()) {
            final Blob fileBlob = lobCreator.createBlob(inputStream, request.getSize());
            File file = fileRepository.save(new File(fileBlob));
            return String.valueOf(file.getId());
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    @Override
    public File getFile(String uuidString) {
        return fileRepository.findById(UUID.fromString(uuidString))
                .orElseThrow(() -> new EntityNotFoundException("file"));
    }
}
