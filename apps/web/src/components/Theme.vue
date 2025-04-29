<script setup lang="ts">
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
// import { Icon } from '@iconify/vue'
import { Moon, Sun, Cog } from 'lucide-vue-next'
import { useColorMode } from '@vueuse/core'

// Pass { disableTransition: false } to enable transitions
const mode = useColorMode()
</script>

<template>
  <DropdownMenu>
    <DropdownMenuTrigger as-child>
      <Button variant="outline" class="max-sm:hidden">
        <Moon></Moon>
        <Sun></Sun>
        <Cog></Cog>
        <!-- <Icon
          icon="radix-icons:moon"
          class="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"
        />
        <Icon
          icon="radix-icons:sun"
          class="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"
        /> -->
        <span class="sr-only">Toggle theme</span>
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end">
      <DropdownMenuItem @click="mode = 'light'"> Light </DropdownMenuItem>
      <DropdownMenuItem @click="mode = 'dark'"> Dark </DropdownMenuItem>
      <DropdownMenuItem @click="mode = 'auto'"> System </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
</template>
