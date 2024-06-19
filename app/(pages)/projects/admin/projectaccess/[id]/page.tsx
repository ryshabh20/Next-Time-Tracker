import GetCookie from "@/helperComponents/getcookies";
import { BASE_URL } from "@/utils/BaseUrl";
import Select from "react-select";
const getEmployees = async (
  role: string
): Promise<{ employees: any[]; success: Boolean }> => {
  const cookie = await GetCookie();
  try {
    const url = `${BASE_URL}admin/project/getemployees?role=${role}`;
    const res = await fetch(url, {
      next: { tags: ["getEmployees"] },
      headers: {
        Cookie: `authtoken=${cookie}`,
      },
    });
    const response = await res.json();
    return {
      employees: response.employees,
      success: true,
    };
  } catch (error: any) {
    console.log("error", error.message);
    return {
      employees: [],
      success: false,
    };
  }
};
const ProjectAccess = async ({ params }: { params: { id: string } }) => {
  const { employees } = await getEmployees(role);
  return (
    <div>
      <span>Assign Project</span>
      <Select
        id="ClientId"
        options={projectOptions}
        onChange={(e: any) => {
          //   setFormData({
          //     ...formData,
          //     client: e?.value,
          //     clientname: e?.label,
          //   });
        }}
        // placeholder={edit ? "" : "Client"}
        // value={selectValue}
      ></Select>
    </div>
  );
};

export default ProjectAccess;
