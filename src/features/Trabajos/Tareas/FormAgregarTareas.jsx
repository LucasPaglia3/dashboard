import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
  DialogDescription,
  DialogHeader,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { Plus } from "lucide-react";
import { useState } from "react";

import { useForm } from "react-hook-form";

import Spinner from "@/components/ui/Spinner";
import { useCreateTarea } from "./useCreateTarea";

const FormAgregarTareas = () => {
  const [open, setOpen] = useState();
  const form = useForm({
    defaultValues: {
      costo: "",
      tarea: "",
    },
  });

  const { createTarea, isCreating } = useCreateTarea();

  const onSubmit = (newTarea) => {
    createTarea(newTarea, {
      onSuccess: () => {
        setOpen(!open);
        form.reset();
      },
    });
  };

  const onCancel = () => {
    form.reset({ costo: 1, tarea: "" });
    setOpen(!open);
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="blue" className="flex items-center">
          <Plus className="mr-1 h-5 w-5" />
          <span>Agregar nueva tarea</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Agregar nueva tarea</DialogTitle>
          <DialogDescription>
            Rellená los datos correspondientes.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-3"
          >
            <FormField
              name="tarea"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <div className="grid grid-cols-7 items-center gap-4">
                    <FormLabel className="col-span-2 text-left">
                      Tarea
                    </FormLabel>
                    <FormControl>
                      <Input
                        className="col-span-3 w-fit"
                        {...form.register("tarea", {
                          required: {
                            value: true,
                            message: "Ingrese la tarea!",
                          },
                        })}
                      />
                    </FormControl>
                  </div>
                </FormItem>
              )}
            />
            <FormField
              name="costo"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <div className="grid grid-cols-7 items-center gap-4">
                    <FormLabel className="col-span-2 text-left">
                      Costo
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        min="1"
                        className="col-span-3 w-fit"
                        {...form.register("costo", {
                          required: {
                            value: true,
                            message: "Ingrese un costo!",
                          },
                        })}
                      />
                    </FormControl>
                  </div>
                </FormItem>
              )}
            />
            <div className="flex gap-1">
              <Button onClick={onCancel} disabled={isCreating}>
                Cancelar
              </Button>
              <Button type="submit" variant="confirm" disabled={isCreating}>
                {isCreating ? <Spinner isForButton={true} /> : "Guardar"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default FormAgregarTareas;
