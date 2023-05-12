import { getContact } from "../contacts";

export function contactDetailQuery(contactId) {
  return {
    queryFn: () => getContact(contactId),
    queryKey: ["contacts", "detail", contactId],
  };
}

export const loader =
  (queryClient) =>
  async ({ params }) => {
    // console.log(queryClient);
    const contact = await queryClient.ensureQueryData(
      contactDetailQuery(params.contactId)
    );

    if (!contact) {
      throw new Response("", {
        status: 404,
        statusText: "Not Found",
      });
    }
    return { contact };
  };
