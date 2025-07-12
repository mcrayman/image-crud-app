"use client";

import { useState } from "react";
import {
  Box,
  Container,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useImages } from "./hooks/useImages";
import { fileToBase64 } from "./utils/base64";
import CreateImage from "./components/CreateImage";
import ImagesList from "./components/ImagesList";

export default function Page() {
  const [name, setName] = useState<string>("");
  const [file, setFile] = useState<File | null>(null);
  const [query, setQuery] = useState<string>("");
  const [error, setError] = useState<string>("");
  
  const { images, addImage, deleteImage, isLoading } = useImages(query);
  
  const handleUpload = async () => {
    if (!file || !name) return false;
    if (file.size > 1 * 1024 * 1024) {
      setError("Image must be smaller than 1MB.");
      return false;
    }
    try {
      const base64 = await fileToBase64(file);
      await addImage({ name, base64, type: file.type });
      setName("");
      setFile(null);
      setError("");
      return true;
    } catch (err) {
      setError("Failed to upload image. Please try again.");
      return false;
    }
  };

  const headerStyle = {
    textAlign: "center",
    mb: 4,
    fontWeight: 800,
    fontSize: {
      xs: "3rem",
      sm: "4rem",
      md: "5rem",
      lg: "6rem",
    },
    color: "white",
    textShadow: "2px 2px 8px rgba(0,0,0,0.7)",
    wordBreak: "break-word",
  };

  return (
    <Container sx={{ py: 8 }}>
      <Typography
        sx={{
          ...headerStyle,
        }}
        variant="h4"
      >
        Image-Inator
      </Typography>

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: 4,
          my: 4,
          flexWrap: "wrap",
        }}
      >
        <TextField
          label="Search Images"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          slotProps={{
            input: {
              sx: {
                borderRadius: 10,
                backgroundColor: "white",
                boxShadow: 1,
              },
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon color="action" />
                </InputAdornment>
              ),
            },
          }}
        />

        <CreateImage
          name={name}
          setName={setName}
          file={file}
          setFile={setFile}
          handleUpload={handleUpload}
          error={error}
        />
      </Box>

      <ImagesList
        isLoading={isLoading}
        images={images || []}
        deleteImage={deleteImage}
      />
    </Container>
  );
}
