"use client";
import Project from "@/db/models/projectSchema";
import { BASE_URL } from "@/utils/BaseUrl";
import useNotify from "@/utils/Notify";
import axios from "axios";
import { FormEvent, FormEventHandler, useEffect, useState } from "react";
import Select from "react-select";

type assignedTeamType = Record<
  string,
  {
    value: string;
    label: string;
  }[]
>;
const SelectProject = ({
  projectDetail,
  employees,
}: {
  projectDetail: Project;
  employees: Employee[];
}) => {
  const [formData, setFormData] = useState<assignedTeamType>({});
  const notify = useNotify();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (Object.values(formData).length) {
      try {
        const IdsArray = Object.values(formData)
          .map((val: { value: string; label: string }[]) =>
            val.map(
              (nestedVal: { value: string; label: string }) => nestedVal.value
            )
          )
          .flat();
        const data = {
          assignedMembers: IdsArray,
          projectId: projectDetail._id,
        };
        await axios.post(`${BASE_URL}/admin/project/updateaccess`, data);
        notify(true, "Project access updated successfully");
      } catch (error: any) {
        notify(true, error.message);
      }
    }
  };

  useEffect(() => {
    const ob: Record<string, any> = {};
    projectDetail?.assignedMembers.forEach((b) => {
      ob[b.department] ??= [];
      ob[b.department].push({
        label: b.email || b.code + " : " + b.employeename,
        value: b._id,
      });
    });
    setFormData(ob);
  }, []);
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <span>Assign Project</span>
        {projectDetail?.assignedTeam?.map((dept: string, idx: number) => {
          const EmployeeOptions = employees
            .filter((emp: Employee) => emp.department === dept)
            .map((emp: Employee) => ({
              label: emp.email || emp.code + " : " + emp.employeename,
              value: emp._id,
            }));
          return (
            <div key={idx}>
              <span>Choose someone for your {dept} team</span>
              <Select
                id="EmployeeId"
                options={EmployeeOptions}
                isMulti
                onChange={(e: any) => {
                  setFormData({ ...formData, [dept]: e });
                }}
                // placeholder={edit ? "" : "Client"}
                value={formData[dept]}
              ></Select>
            </div>
          );
        })}
      </div>
      <button
        type="submit"
        className="bg-custom-green p-2 ml-auto float-right text-white align-right rounded-sm"
      >
        Save
      </button>
    </form>
  );
};

export default SelectProject;
