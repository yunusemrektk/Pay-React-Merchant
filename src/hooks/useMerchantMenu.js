// hooks/useMerchantMenu.js
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getMerchantCategories, getMerchantMenuItems, saveMenuOrder } from '../services/merchantService'

export function useMerchantMenu(merchantId) {
    const qc = useQueryClient()

    const { data: menu = [], isLoading, error } = useQuery({
        queryKey: ['menu', merchantId],
        queryFn: () => getMerchantMenuItems(merchantId),
    })

    //TODO SAVE ORDER
    const saveOrder = useMutation({
        mutationFn: (newOrderIds) => saveMenuOrder(merchantId, newOrderIds),
        onSuccess: () => {
            qc.invalidateQueries({ queryKey: ['menu', merchantId] })
        }
    })

    return { menu, isLoading, error, saveOrder: saveOrder.mutate }
}
