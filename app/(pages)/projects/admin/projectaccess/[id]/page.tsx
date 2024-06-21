import Project from "@/db/models/projectSchema";
import GetCookie from "@/helperComponents/getcookies";
import { BASE_URL } from "@/utils/BaseUrl";
import SelectProject from "./SelectProject";

const getProject = async (id: string) => {
  try {
    const projectDetail = await Project.findById(id);
    console.log(projectDetail);
    return projectDetail;
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
  const cookie = await GetCookie();
  const projectDetail = await getProject(params.id);
  const role = Object.keys(projectDetail?.assignedTeam);
  const { employees } = await getEmployees(role, cookie);
  console.log("projectDetail========>", projectDetail);
  return <SelectProject projectDetail={projectDetail} employees={employees} />;
};

export default ProjectAccess;
