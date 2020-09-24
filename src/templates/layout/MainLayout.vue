<template>
	<MainLayout
		:header-nav="[
              {
                label: 'Chương trình học',
                children: [
                  {
                    label: 'Khóa học online',
                    href: '/course-online/',
                  },
                  {
                    label: 'Khóa học offline',
                    href: '/course-offline/',
                  },
                  { 
                    label: 'Tài liệu', 
                    href: '/ebook/',
                  },
                  { 
                    label: 'Sự kiện', 
                    href: '/event-list/',
                  }
                ]
              },
              {
                label: 'Kích hoạt',
                href: '/active-course/'
              },
              {
                label: 'Cơ sở',
                href: '/department/'
              },
            ]"
		isAuthenticated
		:user-profile="{
              name: 'QuangLD',
              email: 'QuangLD@gmail.com',
              avatar: 'https://images.unsplash.com/photo-1586297098710-0382a496c814'
            }"
		:contact-info="{
              phone: '0912345678', 
              email: 'QuangLD@gmail.com', 
              address: 'Số 248 Khâm Thiên, Thổ Quan, Đống Đa, Hà Nội'
            }"
	>
		<slot />
	</MainLayout>
</template>