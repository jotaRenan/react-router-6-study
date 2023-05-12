import { updateContact } from "../contacts";

export const action =
  (queryClient) =>
  async ({ request, params }) => {
    let formData = await request.formData();
    const contact = await updateContact(params.contactId, {
      favorite: formData.get("favorite") === "true",
    });
    await queryClient.invalidateQueries({ queryKey: ["contacts"] });
    return contact;
  };
