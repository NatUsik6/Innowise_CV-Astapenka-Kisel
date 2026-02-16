'use client';

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from "@mui/material";
import { useUpdateCv } from "@/entities/cv/api/useUpdateCv";
import { CV } from "@/entities/cv/model/cvs.types";
import { CreateCvFormValues, createCvSchema } from "@/features/cv-create/model/createCvSchema";
import { CreateCvForm } from "@/features/cv-create/ui/CreateCvForm";
import { 
  dialogTitleSx, 
  dialogPaperSx, 
  dialogActionsSx, 
  cancelButtonSx, 
  createButtonSx, 
  formGridSx 
} from "@/features/cv-create/ui/CreateCvModal.styles";

export const UpdateCvModal = ({ open, onClose, cv }: { open: boolean, onClose: () => void, cv: CV }) => {
  const [updateCv, { loading: updating }] = useUpdateCv();
  const { register, handleSubmit, formState: { errors, isDirty }, reset } = useForm<CreateCvFormValues>({
    resolver: zodResolver(createCvSchema),
    defaultValues: {
      name: cv.name,
      education: cv.education,
      description: cv.description
    },
  });

  useEffect(() => {
    if (open) {
      reset({
        name: cv.name,
        education: cv.education,
        description: cv.description
      });
    }
  }, [cv, reset, open]);

  const submitHandler = async (data: CreateCvFormValues) => {
    try {
      await updateCv({
        variables: { 
          cv: { cvId: cv.id, ...data } 
        },
      });
      onClose();
    } catch (err) {
      console.error('Update failed:', err);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth PaperProps={{ sx: dialogPaperSx }}>
       <form onSubmit={handleSubmit(submitHandler)}>
          <DialogContent>
            <CreateCvForm register={register} errors={errors} formGridSx={formGridSx} />
          </DialogContent>
          <DialogActions sx={dialogActionsSx}>
            <Button onClick={onClose} variant="outlined" sx={cancelButtonSx}>
              CANCEL
            </Button>
            <Button 
              type="submit" 
              variant="contained" 
              disabled={!isDirty || updating}
              sx={createButtonSx(isDirty && !updating)}
            >
              {updating ? 'UPDATING...' : 'UPDATE'}
            </Button>
          </DialogActions>
        </form>
    </Dialog>
  );
};