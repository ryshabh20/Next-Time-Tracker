import Pagination from "@/app/ui/Pagination";
import { ProjectTableHeaders } from "@/app/ui/data";
import AddButton from "@/app/ui/AddButton";
import ProjectsTable from "@/app/ui/projects/ProjectsTable";
import Search from "@/app/ui/Search";
import GetCookie from "@/helperComponents/getcookies";
import { BASE_URL } from "@/utils/BaseUrl";
const GetProjects = async (
  search: string,
  currentPage: number,
  sortBy: string,
  order: string
) => {
  try {
    const cookie = await GetCookie();
    const url = `${BASE_URL}admin/project/getprojects?search=${search}&page=${currentPage}&sort=${sortBy}&order=${order}`;
    const res = await fetch(url, {
      next: { tags: ["projects"] },
      headers: {
        Cookie: `authjs.session-token=${cookie}`,
      },
    });

    const response = await res.json();
    return {
      success: true,
      projects: response.projects,
      totalPages: Math.ceil(response.pagination.pageCount),
      role: response.role,
    };
  } catch (error) {
    return { success: false };
  }
};
export default async function Page({
  searchParams,
}: {
  searchParams?: {
    search?: string;
    page?: string;
    sort?: string;
    order?: string;
  };
}) {
  const search = searchParams?.search || "";
  const currentPage = Number(searchParams?.page) || 1;
  const sortBy = searchParams?.sort || "";

  const order = searchParams?.order || "";
  const {
    projects = [],
    totalPages,
    role,
  } = await GetProjects(search, currentPage, sortBy, order);

  const options = [
    { value: "clients", label: "Clients" },
    { value: "employees", label: "Employees" },
  ];
  return (
    <div className="flex flex-col max-h-screen space-y-10">
      <AddButton
        page="Project"
        role={role}
        apiroute="/projects/admin/addproject"
        text="Add a new Project"
      />
      <Search options={options} placeholder="Search by project name" />
      <ProjectsTable TableHeaders={ProjectTableHeaders} projects={projects} />
      <Pagination totalPages={totalPages!} />
    </div>
  );
}
