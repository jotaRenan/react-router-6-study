import { redirect } from "react-router-dom";
import { updateContact } from "../contacts";

export const action =
  (queryClient) =>
  async ({ request, params }) => {
    const formData = await request.formData();
    const updates = Object.fromEntries(formData);
    await updateContact(params.contactId, updates);
    queryClient.invalidateQueries({ queryKey: ["contacts"] });
    return redirect(`/contacts/${params.contactId}`);
  };
