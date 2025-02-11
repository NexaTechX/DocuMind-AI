// usageCheckMiddleware.ts

import { supabase } from '@/lib/supabase'; // Adjust the path as necessary

export const usageCheckMiddleware = async (req, res, next) => {
  const userId = req.user.id; // Assuming you have user ID in the request
  const { data: user, error } = await supabase
    .from('users')
    .select('documents_analyzed, usage_limit')
    .eq('id', userId)
    .single();

  if (error) {
    return res.status(500).json({ message: 'Error fetching user data' });
  }

  if (user.documents_analyzed >= user.usage_limit) {
    return res.status(403).json({ message: 'Usage limit exceeded' });
  }

  // Proceed to the next middleware or route handler
  next();
};