import { machineIdSync } from 'node-machine-id'
import { createClient } from '@supabase/supabase-js'
import os from 'node:os'
import { app, BrowserWindow, shell, ipcMain, screen } from 'electron'

export class Analytics {
  constructor() {
    this.supabase = this.init()
    this.initEvents()
  }

  supabase

  init() {
    return createClient(
      'https://wcyaxelmpxohdbzngldd.supabase.co',
       'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndjeWF4ZWxtcHhvaGRiem5nbGRkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDIyNzY3MTcsImV4cCI6MjA1Nzg1MjcxN30.H-eWWldSBMuJorUhu8Y6t6LEbkAnqoSneE4MsaRFom4'
    )
  }

  initEvents() {
    const ip = this.getLocalIp()
    this.recordInstallation()
    this.recordUserActivity()
  }
    
  // 获取本地IP地址
  getLocalIp() {
    const interfaces = os.networkInterfaces()
    for (const name of Object.keys(interfaces)) {
      for (const net of interfaces[name]) {
        if (!net.internal && net.family === 'IPv4') {
          return net.address
        }
      }
    }
    return null
  }

  async recordInstallation() {
    const today = new Date().toISOString().split('T')[0]
    const deviceId = machineIdSync()

    try {
      const { data: existingDevice } = await this.supabase
        .from('device_installations')
        .select('id')
        .eq('device_id', deviceId)
        .single()
  
      if (!existingDevice) {
        await this.supabase
          .from('device_installations')
          .insert([{
            device_id: deviceId,
            install_date: today,
            os_type: process.platform,
            os_version: os.release(),
            os_arch: process.arch,
            app_version: app.getVersion(),
            node_version: process.version,
            local_ip: this.getLocalIp()
          }])
        console.log('[T] New installation recorded successfully')
      } else {
        console.log('[T] Device already installed, skipping installation record')
      }
    } catch (error) {
      console.error('[T] Error recording installation:', error)
    }
  }

  async recordUserActivity() {
    const today = new Date().toISOString().split('T')[0]
    const deviceId = machineIdSync()
    try {
      // 检查今天是否已记录过该设备的活跃状态
      const { data: existingActivity } = await this.supabase
        .from('activities')
        .select('id')
        .eq('device_id', deviceId)
        .eq('date', today)
      
      if (!existingActivity.length) {
        const { error } = await this.supabase
          .from('activities')
          .insert([{
            device_id: deviceId,
            date: today
          }])
        if (error) throw error
        console.log('[T] User activity recorded successfully')
      } else {
        console.log('[T] User activity already recorded today')
      }
    } catch (error) {
      console.error('[T] Error recording user activity:', error)
    }
  }
}