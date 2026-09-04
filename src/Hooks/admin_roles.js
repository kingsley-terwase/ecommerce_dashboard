// @ts-nocheck
import { useState } from "react";
import axiosInstance from "../Utils/AxiosInstance";
import { getErrorMessage } from "../Utils/Msg";
import { useNotification } from "@/contexts/notification";

/**
 * Converts a plain object into application/x-www-form-urlencoded — this
 * endpoint's create/update bodies are form-urlencoded (confirmed from the
 * Postman doc), same convention as the /auth/* endpoints.
 * @param {{ [s: string]: any; } | ArrayLike<any>} payload
 */
function toFormData(payload) {
    const params = new URLSearchParams();
    Object.entries(payload).forEach(([key, value]) => {
        if (value !== undefined && value !== null) params.append(key, String(value));
    });
    return params;
}
const formHeaders = { headers: { "Content-Type": "application/x-www-form-urlencoded" } };

export const useAdminTypes = () => {
    const [loading, setLoading] = useState(false);
    const [adminTypes, setAdminTypes] = useState([]);
    const { error: notifyError } = useNotification();

    const fetchAdminTypes = async () => {
        setLoading(true);
        try {
            const response = await axiosInstance.get("/admin/admin-types");
            setAdminTypes(response.data.result || []);
            setLoading(false);
            return { success: true };
        } catch (error) {
            notifyError(getErrorMessage(error, "Could not load admin roles"));
            setLoading(false);
            return { success: false };
        }
    };

    return { fetchAdminTypes, adminTypes, loading };
};

export const useAdminTypeDetail = () => {
    const [loading, setLoading] = useState(false);
    const { error: notifyError } = useNotification();

    const fetchAdminType = async (id) => {
        setLoading(true);
        try {
            const response = await axiosInstance.get(`/admin/admin-type/view/${id}`);
            setLoading(false);
            return { success: true, result: response.data.result };
        } catch (error) {
            notifyError(getErrorMessage(error, "Could not load admin role"));
            setLoading(false);
            return { success: false };
        }
    };

    return { fetchAdminType, loading };
};

export const useCreateAdminType = () => {
    const [loading, setLoading] = useState(false);
    const { success: notifySuccess, error: notifyError } = useNotification();

    const createAdminType = async ({ admin_type, status, description, scope, resource }) => {
        setLoading(true);
        try {
            if (!admin_type) {
                notifyError("Admin type name is required");
                setLoading(false);
                return { success: false };
            }
            if (!resource) {
                notifyError("Resource is required");
                setLoading(false);
                return { success: false };
            }
            if (!scope) {
                notifyError("Scope is required");
                setLoading(false);
                return { success: false };
            }

            const response = await axiosInstance.post(
                "/admin/admin-type/create",
                toFormData({ admin_type, status, description, scope, resource }),
                formHeaders
            );

            const { message, success, result } = response.data;

            if (!success) {
                notifyError(message || "Could not create admin role");
                setLoading(false);
                return { success: false };
            }

            notifySuccess(message || "Admin type created successfully");
            setLoading(false);
            return { success: true, result };
        } catch (error) {
            notifyError(getErrorMessage(error, "Could not create admin role"));
            setLoading(false);
            return { success: false };
        }
    };

    return { createAdminType, loading };
};


export const useUpdateAdminType = () => {
    const [loading, setLoading] = useState(false);
    const { success: notifySuccess, error: notifyError } = useNotification();

    const updateAdminType = async (id, { admin_type, status, description, scope, resource }) => {
        setLoading(true);
        try {
            const response = await axiosInstance.patch(
                `/admin/admin-type/update/${id}`,
                toFormData({ admin_type, status, description, scope, resource }),
                formHeaders
            );

            const { message, success, result } = response.data;

            if (!success) {
                notifyError(message || "Could not update admin role");
                setLoading(false);
                return { success: false };
            }

            notifySuccess(message || "Admin type updated successfully");
            setLoading(false);
            return { success: true, result };
        } catch (error) {
            notifyError(getErrorMessage(error, "Could not update admin role"));
            setLoading(false);
            return { success: false };
        }
    };

    return { updateAdminType, loading };
};