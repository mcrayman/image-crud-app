import {
  Typography,
  Box,
  IconButton,
} from "@mui/material";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import DeleteIcon from "@mui/icons-material/Delete";

type Props = {
  isLoading: boolean;
  images: any[];
  deleteImage: (id: string) => void;
};

export default function ImagesList({ isLoading, images, deleteImage }: Props) {
  return (
    <div>
      {isLoading ? (
        <Typography>Loading...</Typography>
      ) : (
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 3 }}>
          <ImageList sx={{ variant: "masonry", cols: 3, gap: 8 }}>
            {images?.map((img: any) => (
                <ImageListItem key={img.id} sx={{ borderRadius: 3 }}>
                <img src={img.base64} alt={img.name} loading="lazy" />
                <ImageListItemBar
                  sx={{
                  background:
                    "linear-gradient(to right, #f5f5f5 0%, #e0e0e0 100%)",
                  color: "black",
                  paddingLeft: 2,
                  }}
                  position="below"
                  title={img.name}
                  actionIcon={
                  <IconButton onClick={() => deleteImage(img.id)}>
                    <DeleteIcon />
                  </IconButton>
                  }
                />
                </ImageListItem>
            ))}
          </ImageList>
        </Box>
      )}
    </div>
  );
}
