import Project from "@/db/models/projectSchema";
import GetCookie from "@/helperComponents/getcookies";
import { BASE_URL } from "@/utils/BaseUrl";
import SelectProject from "./SelectProject";

const getProject = async (id: string, cookie: string) => {
  try {
    const url = `${BASE_URL}admin/project/accessdetail`;
    const res = await fetch(url, {
      method: "POST",
      body: JSON.stringify(id),
      next: { tags: ["getEmployees"] },
      headers: {
        Cookie: `authjs.session-token=${cookie}`,
      },
    });
    const response = await res.json();
    return response.projectDetail;
  } catch (error: any) {
    console.log("error", error.message);
  }
};

const getEmployees = async (
  role: string[],
  cookie: string
): Promise<{ employees: any[]; success: Boolean }> => {
  try {
    const url = `${BASE_URL}admin/project/projectaccess`;
    const res = await fetch(url, {
      method: "POST",
      body: JSON.stringify(role),
      next: { tags: ["getEmployees"] },
      headers: {
        Cookie: `authjs.session-token=${cookie}`,
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
  const cookie = await GetCookie();
  const projectDetail = await getProject(params.id, cookie);

  const role = projectDetail?.assignedTeam;
  const { employees } = await getEmployees(role, cookie);
  return <SelectProject projectDetail={projectDetail} employees={employees} />;
};

export default ProjectAccess;
