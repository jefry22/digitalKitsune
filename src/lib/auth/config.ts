export type Role = "admin" | "pm" | "developer";

export type DemoUser = {
  id: string;
  name: string;
  email: string;
  role: Role;
  password: string;
};

export const SESSION_COOKIE_NAME = "dk_session";

export const ROLE_LABEL: Record<Role, string> = {
  admin: "Administrador",
  pm: "Project Manager",
  developer: "Desarrollador",
};

export const ROLE_ACCESS: Record<string, Role[]> = {
  "/admin": ["admin"],
  "/pm": ["admin", "pm"],
  "/developer": ["admin", "pm", "developer"],
};

export const DEMO_USERS: DemoUser[] = [
  {
    id: "u-admin",
    name: "Admin DigitalKitsune",
    email: "admin@digitalkitsune.com",
    role: "admin",
    password: "Admin123!",
  },
  {
    id: "u-pm",
    name: "Paola PM",
    email: "pm@digitalkitsune.com",
    role: "pm",
    password: "Pm123456!",
  },
  {
    id: "u-dev",
    name: "Diego Dev",
    email: "dev@digitalkitsune.com",
    role: "developer",
    password: "Dev123456!",
  },
];
