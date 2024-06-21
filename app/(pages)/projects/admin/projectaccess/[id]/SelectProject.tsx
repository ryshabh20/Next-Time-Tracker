"use client";
import Project from "@/db/models/projectSchema";
import { BASE_URL } from "@/utils/BaseUrl";
import axios from "axios";
import { FormEvent, FormEventHandler, useState } from "react";
import Select from "react-select";

type assignedTeamType = {
  [key: string]:
    | string
    | {
        emp: string;
        empname: string;
        empemail: string;
        empcode: string;
      };
};
const SelectProject = ({
  projectDetail,
  employees,
}: {
  projectDetail: Project;
  employees: Employee[];
}) => {
  const [formData, setFormData] = useState<assignedTeamType>(
    projectDetail.assignedTeam
  );
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!!Object.keys(formData).length) {
      try {
        const data = {
          assignedMembers: formData,
          projectId: projectDetail._id,
        };
        const respone = axios.post(
          `${BASE_URL}/admin/project/updateaccess`,
          data
        );
      } catch (error) {}
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <span>Assign Project</span>
        {Object.keys(projectDetail?.assignedTeam).map(
          (dept: string, idx: number) => {
            const EmployeeOptions = employees
              .filter((emp: Employee) => emp.department === dept)
              .map((emp: Employee) => ({
                label: emp.email || emp.code + " : " + emp.employeename,
                value: emp._id,
                code: emp.code,
                name: emp.employeename,
                email: emp.email,
              }));
            return (
              <div key={idx}>
                <span>Choose someone for your {dept} team</span>
                <Select
                  id="EmployeeId"
                  options={EmployeeOptions}
                  onChange={(e: any) => {
                    setFormData({
                      ...formData,
                      [dept]: {
                        emp: e?.value,
                        empname: e?.name,
                        empemail: e?.label,
                        empcode: e?.code,
                      },
                    });
                  }}
                  // placeholder={edit ? "" : "Client"}
                  // value={selectValue}
                ></Select>
              </div>
            );
          }
        )}
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
