import { UploadFile } from "@mui/icons-material";
import { Box, TextField, Button, Modal, styled } from "@mui/material";
import { useState } from "react";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

type Props = {
  name: string;
  setName: (name: string) => void;
  file: File | null;
  setFile: (file: File | null) => void;
  handleUpload: () => Promise<boolean>;
  error?: string | null;
};

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

const modalStyle = {
  position: "absolute" as const,
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  boxShadow: 1,
  p: 4,
  display: "flex",
  flexDirection: "column",
  gap: 2,
  minWidth: 400,
  borderRadius: 3,
};

export default function CreateImage({
  name,
  setName,
  file,
  setFile,
  handleUpload,
  error,
}: Props) {
  const [open, setOpen] = useState<boolean>(false);
  const handleOpen: () => void = () => setOpen(true);
  const handleClose: () => void = () => setOpen(false);
  return (
    <div>
      <Button
        onClick={handleOpen}
        sx={{
          borderRadius: 10,
          backgroundColor: "green",
          boxShadow: 1,
        }}
        variant="contained"
      >
        Add Image
      </Button>
      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            ...modalStyle,
          }}
        >
          <TextField
            label="Image Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Button
            component="label"
            role={undefined}
            variant="contained"
            tabIndex={-1}
            startIcon={<CloudUploadIcon />}
          >
            Upload files
            <VisuallyHiddenInput
              type="file"
              accept="image/*"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
            />
          </Button>
          {file && (
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <UploadFile />
              <span>{file.name}</span>
            </Box>
          )}
          {error && <Box sx={{ color: "red", mb: 1 }}>{error}</Box>}
          <Button
            onClick={async () => {
              const success = await handleUpload();
              if (success) {
                handleClose();
              }
            }}
            variant="contained"
            disabled={!file || !name}
            sx={{ borderRadius: 2 }}
          >
            Upload Image
          </Button>
        </Box>
      </Modal>
    </div>
  );
}
