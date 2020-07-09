module.exports = {
    'POST /api/sessions': (req, res) => {
        const { userName, password } = req.body;
        switch (userName) {
            case 'admin':
                if (password == '123') {
                    return res.status(201).json({
                        id: '1',
                        displayName: '超级管理员',
                        permissions: ['test2', 'test3', 'test3.write'],
                        sessionId: Math.random().toString(36).substr(2, 8)
                    });
                }
                break;
            case 'test':
                if (password == '123') {
                    return res.status(201).json({
                        id: '2',
                        displayName: '测试用户',
                        permissions: ['test3'],
                        sessionId: Math.random().toString(36).substr(2, 8)
                    });
                }
                break;
        }

        return res.status(404).json({
            error: '用户名不能存在或密码错误！'
        });
    },
    'GET /api/sessions/:sessionId': (req, res) => {
        const { sessionId: paramSessionId } = req.params;
        const { 'x-session-id': sessionId, 'x-user-id': userId } = req.headers;

        if (paramSessionId != sessionId) {
            return res.status(401).json({
                error: '登录超时！'
            });
        }

        switch (userId) {
            case '1':
                return res.status(200).json({
                    id: '1',
                    displayName: '超级管理员',
                    permissions: ['test2', 'test3', 'test3.write'],
                });
            case '2':
                return res.status(200).json({
                    id: '2',
                    displayName: '测试用户',
                    permissions: ['test3']
                });
        }

        return res.status(401).json({
            error: '登录超时！'
        });
    },
    'DELETE /api/sessions/:sessionId': (req, res) => {
        const { sessionId: paramSessionId } = req.params;
        const { 'x-session-id': sessionId, 'x-user-id': userId } = req.headers;

        if (paramSessionId != sessionId) {
            return res.status(401).json({
                error: '登录超时！'
            });
        }

        return res.status(204).end();
    }
};