export function codeInvite(): string {
    let code = "";
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const nums = "0123456789";
    for (let i = 0; i < 5; i++) {
        code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    code += nums.charAt(Math.floor(Math.random() * nums.length));
    return code;
}
