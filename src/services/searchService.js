import * as request from '~/utils/httpRequests';

export const searchService = async (q, type = 'less') => {
    const res = await request.httpRequests.get(`users/search`, {
        params: {
            q,
            type,
        },
    });
    return res.data;
};
