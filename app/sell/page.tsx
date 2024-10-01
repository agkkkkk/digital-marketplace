"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SelectCategory } from "../components/SelectCategory";
import { Textarea } from "@/components/ui/textarea";
import { TextEditor } from "../components/Editor";
import { UploadDropzone } from "@/lib/uploadthing";
import { Button } from "@/components/ui/button";
import { useState } from "react";

import { JSONContent } from "@tiptap/react";
import { useFormState } from "react-dom";
import { SellProduct, State } from "../actions";

export default function sellRoute() {
  const initialState: State = { message: "", status: "undefined" };
  const [state, formAction] = useFormState(SellProduct, initialState);

  const [json, setJson] = useState<null | JSONContent>(null);
  const [images, setImages] = useState<null | string[]>(null);
  const [productFile, setProductFile] = useState<null | string>(null);
  console.log(state?.errors);
  return (
    <section className="max-w-7xl mx-auto px-4 md:px-8 mb-10">
      <Card>
        <form action={formAction}>
          <CardHeader>
            <CardTitle>Sell your product with ease</CardTitle>
            <CardDescription>
              Describe your product over here to let user know what it offers.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-y-10">
            <div className="flex flex-col gap-y-2">
              <Label>Name</Label>
              <Input
                type="text"
                name="name"
                placeholder="Name of your product"
              />
              {state?.errors?.["name"]?.[0] && (
                <p className="text-destructive">
                  {state?.errors?.["name"]?.[0]}
                </p>
              )}
            </div>

            <div className="flex flex-col gap-y-2">
              <Label>Category</Label>
              <SelectCategory />
              {state?.errors?.["category"]?.[0] && (
                <p className="text-destructive">
                  {state?.errors?.["category"]?.[0]}
                </p>
              )}
            </div>

            <div className="flex flex-col gap-y-2">
              <Label>Price</Label>
              <Input type="number" name="price" placeholder="Enter Price" />
              {state?.errors?.["price"]?.[0] && (
                <p className="text-destructive">
                  {state?.errors?.["price"]?.[0]}
                </p>
              )}
            </div>

            <div className="flex flex-col gap-y-2">
              <Label>Summary</Label>
              <Textarea
                name="summary"
                placeholder="Please describe your product briefly over here..."
              />
              {state?.errors?.["summary"]?.[0] && (
                <p className="text-destructive">
                  {state?.errors?.["summary"]?.[0]}
                </p>
              )}
            </div>

            <div className="flex flex-col gap-y-2">
              <Input
                type="hidden"
                name="description"
                value={JSON.stringify(json)}
              />
              <Label>Description</Label>
              <TextEditor json={json} setJson={setJson} />
              {state?.errors?.["description"]?.[0] && (
                <p className="text-destructive">
                  {state?.errors?.["description"]?.[0]}
                </p>
              )}
            </div>

            <div className="flex flex-col gap-y-2">
              <Input
                type="hidden"
                name="images"
                value={JSON.stringify(images)}
              />
              <Label>Product Images</Label>
              <UploadDropzone
                className="border border-text-secondary"
                endpoint="imageUploader"
                onClientUploadComplete={(res) => {
                  setImages(res.map((item) => item.url));
                }}
                onUploadError={(error: Error) => {
                  throw new Error(`${error}`);
                }}
              />
              {state?.errors?.["images"]?.[0] && (
                <p className="text-destructive">
                  {state?.errors?.["images"]?.[0]}
                </p>
              )}
            </div>

            <div className="flex flex-col gap-y-2">
              <Input
                type="hidden"
                name="productFile"
                value={productFile ?? ""}
              />
              <Label>Product File</Label>
              <UploadDropzone
                className="border border-text-secondary"
                onClientUploadComplete={(res) => {
                  setProductFile(res[0].url);
                }}
                endpoint="productFileUpload"
                onUploadError={(error: Error) => {
                  console.log(error);
                  throw new Error(`${error}`);
                }}
              />
              {state?.errors?.["productFile"]?.[0] && (
                <p className="text-destructive">
                  {state?.errors?.["productFile"]?.[0]}
                </p>
              )}
            </div>
          </CardContent>
          <CardFooter className="mt-5">
            <Button type="submit">Submit</Button>
          </CardFooter>
        </form>
      </Card>
    </section>
  );
}
