import { type FC, type Dispatch, type SetStateAction, useEffect, useRef, useState } from 'react';
import { useFetcher } from "react-router-dom";
import { type Form } from '../../lib/domain/models/form';
import {
 Field,
 FieldLabel,
 FieldSet,
} from '@components/ui/field'
import { Input } from '@components/ui/input'
import { Checkbox } from '@components/ui/checkbox'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@components/ui/select'
import { Button } from '@components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@components/ui/dialog'

export interface FormModalProps {
    form: Form
    setOpen: Dispatch<SetStateAction<boolean>>
    open?: boolean
}

const getInitialData = (form: Form): {[key: string]: string | boolean} => ({
  ...form.fields.reduce(
    (accumulator: {[key: string]: string | boolean}, field) => {
      const fieldValue = field.value ?? field.defaultValue;
      accumulator[field.name] = field.type === "checkbox"
        ? fieldValue === true || fieldValue === "true"
        : String(fieldValue ?? "")
      return accumulator
    },
    { hiddenId: form.id || '' }
  )
})

export const FormModal: FC<FormModalProps> = ({
  form,
  setOpen,
  open = true
}) => {
  const [ data, setData ] = useState(() => getInitialData(form));
  const fetcher = useFetcher();
  const isSubmitting = fetcher.state !== "idle";
  const wasSubmitting = useRef(false);

  useEffect(() => {
    if (fetcher.state !== "idle") {
      wasSubmitting.current = true;
      return;
    }

    if (wasSubmitting.current && fetcher.data?.success) {
      setData(getInitialData(form));
      setOpen(false);
    }
    wasSubmitting.current = false;
  }, [fetcher.data, fetcher.state, form, setOpen]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="bg-white">
        <DialogHeader>
          <DialogTitle>{form.title}</DialogTitle>
        </DialogHeader>
        <form
          onSubmit={(event) => {
            event.preventDefault();
            fetcher.submit(data, {
              method: form.method,
              action: form.action,
              encType: form.encType,
            });
          }}
        >
          <FieldSet>
            {form.fields.map((field) => {
              const fieldValue = field.value ?? field.defaultValue ?? "";

              return (
                <Field
                  key={field.name}
                  className={field.type === "checkbox" ? "w-fit max-w-full flex-row items-center gap-2 [&>*]:w-auto" : undefined}
                >
                  {field.type === "select" ? (
                    <>
                      <FieldLabel htmlFor={field.name}>{field.label}</FieldLabel>
                      <Select
                        value={String(data[field.name] ?? fieldValue)}
                        disabled={isSubmitting}
                        onValueChange={(value) =>
                          setData((currentData) => ({
                            ...currentData,
                            [field.name]: value,
                          }))
                        }
                      >
                        <SelectTrigger id={field.name} className="bg-white">
                          <SelectValue placeholder={field.placeHolder} />
                        </SelectTrigger>
                        <SelectContent className="bg-white">
                          {field.options?.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </>
                  ) : field.type === "checkbox" ? (
                    <>
                      <FieldLabel
                        htmlFor={field.name}
                        className="!w-fit max-w-full whitespace-normal break-words"
                      >
                        {field.label}
                      </FieldLabel>
                      <Checkbox
                        id={field.name}
                        name={field.name}
                        className="!h-4 !w-4 aspect-square shrink-0 flex-none rounded-sm data-[state=checked]:border-blue-600 data-[state=checked]:bg-blue-600 data-[state=checked]:text-white"
                        checked={data[field.name] === true}
                        disabled={isSubmitting}
                        onCheckedChange={(checked) =>
                          setData((currentData) => ({
                            ...currentData,
                            [field.name]: checked === true,
                          }))
                        }
                      />
                    </>
                  ) : (
                    <>
                      <FieldLabel htmlFor={field.name}>{field.label}</FieldLabel>
                      <Input
                        id={field.name}
                        name={field.name}
                        type={field.type}
                        placeholder={field.placeHolder}
                        value={String(data[field.name] ?? fieldValue)}
                        step={field.step}
                        disabled={isSubmitting}
                        onChange={(event) =>
                          setData((currentData) => ({
                            ...currentData,
                            [field.name]: event.target.value,
                          }))
                        }
                      />
                    </>
                  )}
                </Field>
              );
            })}
          </FieldSet>
          <DialogFooter className="mt-6">
            <DialogClose disabled={isSubmitting} asChild>
              <Button type="button" variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Submitting" : "Submit"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}