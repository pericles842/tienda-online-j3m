export interface Payment {
    reference: string,

}

export interface Sale {
    id: number,
    id_user: number,
    total_usd: number,
    total_bs: number,
    rate_day: number,
    reference: string,
    pay_method_id: number,
    url_img: string,
    status: string,
    approved_user_id: number | null,
    rejected_user_id: number | null,
    updated_at: string | null,
    created_at: string
}
