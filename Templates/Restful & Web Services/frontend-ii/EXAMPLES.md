# Code Examples

## Adding a New Feature

### Example: Adding a "Posts" Feature

#### 1. Define Types

```typescript
// src/types/index.ts
export interface Post {
  id: string;
  title: string;
  content: string;
  authorId: string;
  createdAt: string;
}
```

#### 2. Create Service

```typescript
// src/services/post.service.ts
import { api } from './api';
import { Post } from '@/types';

export const postService = {
  getAll: async () => {
    return api.get<Post[]>('/posts');
  },

  getById: async (id: string) => {
    return api.get<Post>(`/posts/${id}`);
  },

  create: async (data: Partial<Post>) => {
    return api.post<Post>('/posts', data);
  },

  update: async (id: string, data: Partial<Post>) => {
    return api.put<Post>(`/posts/${id}`, data);
  },

  delete: async (id: string) => {
    return api.delete(`/posts/${id}`);
  },
};
```

#### 3. Create Custom Hook

```typescript
// src/hooks/usePosts.ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { postService } from '@/services/post.service';
import { toast } from 'sonner';

export function usePosts() {
  return useQuery({
    queryKey: ['posts'],
    queryFn: postService.getAll,
  });
}

export function useCreatePost() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: postService.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
      toast.success('Post created successfully');
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Failed to create post');
    },
  });
}
```

#### 4. Create Form Component

```typescript
// src/features/posts/CreatePostForm.tsx
'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useCreatePost } from '@/hooks/usePosts';
import FormField from '@/components/shared/FormField';
import Button from '@/components/ui/Button';

const postSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters'),
  content: z.string().min(10, 'Content must be at least 10 characters'),
});

type PostFormData = z.infer<typeof postSchema>;

export default function CreatePostForm({ onSuccess }: { onSuccess?: () => void }) {
  const { register, handleSubmit, formState: { errors }, reset } = useForm<PostFormData>({
    resolver: zodResolver(postSchema),
  });

  const mutation = useCreatePost();

  const onSubmit = (data: PostFormData) => {
    mutation.mutate(data, {
      onSuccess: () => {
        reset();
        onSuccess?.();
      },
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <FormField
        label="Title"
        error={errors.title?.message}
        {...register('title')}
      />
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Content
        </label>
        <textarea
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
          rows={4}
          {...register('content')}
        />
        {errors.content && (
          <p className="mt-1 text-sm text-red-600">{errors.content.message}</p>
        )}
      </div>
      <Button type="submit" isLoading={mutation.isPending}>
        Create Post
      </Button>
    </form>
  );
}
```

#### 5. Create Page

```typescript
// src/app/posts/page.tsx
'use client';

import { useState } from 'react';
import { usePosts } from '@/hooks/usePosts';
import Table from '@/components/ui/Table';
import Modal from '@/components/ui/Modal';
import Button from '@/components/ui/Button';
import Loader from '@/components/ui/Loader';
import CreatePostForm from '@/features/posts/CreatePostForm';
import { Post } from '@/types';

export default function PostsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data, isLoading } = usePosts();

  const columns = [
    { header: 'Title', accessor: 'title' as keyof Post },
    { header: 'Content', accessor: 'content' as keyof Post },
    {
      header: 'Created',
      accessor: (row: Post) => new Date(row.createdAt).toLocaleDateString(),
    },
  ];

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Posts</h1>
        <Button onClick={() => setIsModalOpen(true)}>Create Post</Button>
      </div>

      {isLoading ? (
        <Loader size="lg" />
      ) : (
        <Table data={data?.data || []} columns={columns} />
      )}

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Create New Post"
      >
        <CreatePostForm onSuccess={() => setIsModalOpen(false)} />
      </Modal>
    </div>
  );
}
```

## Common Patterns

### Protected API Call

```typescript
const { data, isLoading, error } = useQuery({
  queryKey: ['protected-data'],
  queryFn: async () => {
    const response = await api.get('/protected-endpoint');
    return response.data;
  },
});
```

### Form with File Upload

```typescript
const handleSubmit = async (data: FormData) => {
  const formData = new FormData();
  formData.append('file', data.file[0]);
  formData.append('title', data.title);

  await axios.post('/upload', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
};
```

### Optimistic Updates

```typescript
const mutation = useMutation({
  mutationFn: updateUser,
  onMutate: async (newUser) => {
    await queryClient.cancelQueries({ queryKey: ['users'] });
    const previousUsers = queryClient.getQueryData(['users']);
    queryClient.setQueryData(['users'], (old: any) => [...old, newUser]);
    return { previousUsers };
  },
  onError: (err, newUser, context) => {
    queryClient.setQueryData(['users'], context?.previousUsers);
  },
  onSettled: () => {
    queryClient.invalidateQueries({ queryKey: ['users'] });
  },
});
```

### Debounced Search

```typescript
import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';

function SearchComponent() {
  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearch(search), 500);
    return () => clearTimeout(timer);
  }, [search]);

  const { data } = useQuery({
    queryKey: ['search', debouncedSearch],
    queryFn: () => api.get(`/search?q=${debouncedSearch}`),
    enabled: debouncedSearch.length > 0,
  });

  return <input value={search} onChange={(e) => setSearch(e.target.value)} />;
}
```

### Pagination

```typescript
function PaginatedList() {
  const [page, setPage] = useState(1);

  const { data } = useQuery({
    queryKey: ['items', page],
    queryFn: () => api.get(`/items?page=${page}&limit=10`),
  });

  return (
    <div>
      <Table data={data?.data || []} columns={columns} />
      <div className="flex gap-2 mt-4">
        <Button onClick={() => setPage(p => Math.max(1, p - 1))}>Previous</Button>
        <Button onClick={() => setPage(p => p + 1)}>Next</Button>
      </div>
    </div>
  );
}
```

## Tips

1. **Always use TanStack Query** for server state
2. **Validate with Zod** before sending to backend
3. **Show loading states** with `isLoading` or `isPending`
4. **Handle errors** with toast notifications
5. **Invalidate queries** after mutations
6. **Use TypeScript** for type safety
7. **Keep components small** and focused
8. **Reuse existing components** whenever possible
