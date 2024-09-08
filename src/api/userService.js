import apiHelper from '../api/apiHelper';

const userService = {
    getLists: (params) => {
        const paramsSearch = new URLSearchParams(params);
        return apiHelper.get(`admin/user?${paramsSearch.toString()}`);
    },

    add: (petData) => {
        return apiHelper.post('admin/user', petData);
    },

    update: (id, petData) => {
        return apiHelper.put(`admin/user/${id}`, petData);
    },

    delete: (id) => {
        return apiHelper.delete(`admin/user/${id}`);
    },
};

export default userService;
