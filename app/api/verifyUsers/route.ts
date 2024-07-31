import { setUpOIDC } from "@/utils/openid/client";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
    const cookieStore = cookies();
    const client = await setUpOIDC();
    const supabase = createClient();
    const token = cookieStore.get('token')?.value;

    if (!token) {
        return NextResponse.redirect('/login');
    }

    const {sub,name,picture} = await client.userinfo(token);
    console.log(sub,name,picture);

    const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('uniq_id', sub)
        .single();

    if (profileError && profileError.code !== 'PGRST116') {
        console.error('Error fetching profile:', profileError);
        return NextResponse.error();
    }

    if (profile) {
        // jika profile ada maka response ok true
        return NextResponse.json({ success: true ,status: 200});
    }

    const { error: insertError } = await supabase
        .from('profiles')
        .insert([{ uniq_id: sub,full_name: name }]);

    if (insertError) {
        console.error('Error inserting profile:', insertError);
        return NextResponse.error();
    }

    return NextResponse.json({ success: true ,status: 200});
}