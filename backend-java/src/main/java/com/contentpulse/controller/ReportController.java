package com.contentpulse.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.contentpulse.dto.UploadResponse;

@RestController
@RequestMapping("/api/reports")
public class ReportController {

    @PostMapping("/upload")
    public ResponseEntity<UploadResponse> upload(@RequestParam("file") MultipartFile file) {
        UploadResponse response = new UploadResponse(true, "File received successfully");
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

}
