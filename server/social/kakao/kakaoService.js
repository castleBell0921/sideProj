const pool = require('../../config/db');

const kakaoService = async (socialId) => {
    const connetcion = await pool.getConnection();
    try {
        const [result] = await connetcion.execute(
            'SELECT * FROM USERS WHERE SOCIAL_ID = ?',
            [socialId]
        );
        return result[0];
    } catch(error) {
        throw new Error(error.message);
    } finally {
        connetcion.release();
    }
}


module.exports = { kakaoService };