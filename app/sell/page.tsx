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

export default function sellRoute() {
  return (
    <section className="max-w-7xl mx-auto px-4 md:px-8 mb-10">
      <Card>
        <form>
          <CardHeader>
            <CardTitle>Sell your product with ease</CardTitle>
            <CardDescription>
              Describe your product over here to let user know what it offers.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-y-10">
            <div className="flex flex-col gap-y-2">
              <Label>Name</Label>
              <Input type="text" placeholder="Name of your product" />
            </div>
            <div className="flex flex-col gap-y-2">
              <Label>Category</Label>
              <SelectCategory />
            </div>
            <div className="flex flex-col gap-y-2">
              <Label>Price</Label>
              <Input type="number" placeholder="Enter Price" />
            </div>
            <div className="flex flex-col gap-y-2">
              <Label>Summary</Label>
              <Textarea placeholder="Please describe your product briefly over here..." />
            </div>
            <div className="flex flex-col gap-y-2">
              <Label>Description</Label>
              <TextEditor />
            </div>
            <div className="flex flex-col gap-y-2">
              <Label>Product Images</Label>
              <UploadDropzone endpoint="imageUploader" />
            </div>
            <div className="flex flex-col gap-y-2">
              <Label>Product File</Label>
              <UploadDropzone endpoint="productFileUpload" />
            </div>
          </CardContent>
          <CardFooter className="mt-5">
            <Button>Submit</Button>
          </CardFooter>
        </form>
      </Card>
    </section>
  );
}
